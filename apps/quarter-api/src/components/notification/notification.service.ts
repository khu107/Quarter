import { Model, ObjectId } from 'mongoose';
import { Property } from '../../libs/dto/property/property';
import { BoardArticle } from '../../libs/dto/board-article/board-article';
import { Member } from '../../libs/dto/member/member';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from '../../libs/dto/notification/notification';
import { NotificationStatus } from '../../libs/enums/notification.enum';
import { ContactInput } from '../../libs/dto/contact/contact.input';

@Injectable()
export class NotificationService {
	constructor(
		@InjectModel('Notification') private notificationModel: Model<Notification>,
		@InjectModel('Property') private propertyModel: Model<Property>, // 속성 모델을 주입
		@InjectModel('BoardArticle') private boardArticle: Model<BoardArticle>, // 기사 모델을 주입
		@InjectModel('Member') private memberModel: Model<Member>, // 회원 모델을 주입
	) {}

	async createNotificationForLike(likeType: string, likeId: ObjectId, authorId: ObjectId): Promise<void> {
		let receiverId: ObjectId;
		let authorName = '';

		const author = await this.memberModel.findById(authorId);
		if (author) {
			authorName = author.memberNick; // 'name'은 사용자 이름을 가지고 있는 필드라고 가정
		}

		switch (likeType) {
			case 'MEMBER':
				receiverId = likeId;
				break;
			case 'PROPERTY':
				const property = await this.propertyModel.findById(likeId);
				receiverId = property.memberId; // ownerId는 속성의 소유자 ID
				break;
			case 'ARTICLE':
				const article = await this.boardArticle.findById(likeId);
				receiverId = article.memberId; // authorId는 기사의 저자 ID
				break;
			default:
				throw new Error('Unknown like type');
		}

		const notification = new this.notificationModel({
			notificationType: 'LIKE',
			notificationGroup: likeType,
			notificationTitle: `${author.memberNick} New Like on ${likeType}`,
			notificationDesc: `Your ${likeType.toLowerCase()} got a new like!`,
			authorId,
			receiverId,
			[`${likeType.toLowerCase()}Id`]: likeId,
		});

		await notification.save();
	}

	async createNotificationForUnlike(likeType: string, likeId: ObjectId, authorId: ObjectId): Promise<void> {
		let receiverId: ObjectId;
		let authorName = '';

		const author = await this.memberModel.findById(authorId);
		if (author) {
			authorName = author.memberNick; // Assuming 'memberNick' is the field for user's nickname
		}

		switch (likeType) {
			case 'MEMBER':
				receiverId = likeId;
				break;
			case 'PROPERTY':
				const property = await this.propertyModel.findById(likeId);
				receiverId = property.memberId;
				break;
			case 'ARTICLE':
				const article = await this.boardArticle.findById(likeId);
				receiverId = article.memberId;
				break;
			default:
				throw new Error('Unknown like type');
		}

		const notification = new this.notificationModel({
			notificationType: 'LIKE',
			notificationGroup: likeType,
			notificationTitle: `${authorName} removed their like from your ${likeType.toLowerCase()}`,
			notificationDesc: `${authorName} no longer likes your ${likeType.toLowerCase()}.`,
			authorId,
			receiverId,
			[`${likeType.toLowerCase()}Id`]: likeId,
		});

		await notification.save();
	}

	async markNotificationAsRead(notificationId: ObjectId): Promise<void> {
		await this.notificationModel.updateOne(
			{ _id: notificationId },
			{ $set: { notificationStatus: NotificationStatus.READ } },
		);
	}

	public async getNotificationsByUserId(userId: ObjectId): Promise<Notification[]> {
		return await this.notificationModel.find({ receiverId: userId }).sort({ createdAt: -1 }).exec();
	}

	public async createNotificationForComment(
		commentType: string,
		commentId: ObjectId,
		authorId: ObjectId,
		commentContent: string,
	): Promise<void> {
		let receiverId: ObjectId;
		let authorName = '';
		const author = await this.memberModel.findById(authorId);
		if (!author) {
			console.error(`Author with ID ${authorId} not found.`);
			return; // 작성자가 데이터베이스에 없는 경우, 작업을 중지
		}
		authorName = author.memberNick; // 작성자 이름 설정
		// 댓글 타입에 따라 소유자 ID를 찾아냅니다.
		switch (commentType) {
			case 'PROPERTY':
				const property = await this.propertyModel.findById(commentId);
				receiverId = property.memberId;
				break;
			case 'ARTICLE':
				const article = await this.boardArticle.findById(commentId);
				receiverId = article.memberId;
				break;
			case 'MEMBER':
				receiverId = commentId; // 멤버에 대한 댓글인 경우, 댓글 대상자가 수신자입니다.
				break;
			default:
				throw new Error('Unknown comment type');
		}

		const notification = new this.notificationModel({
			notificationType: 'COMMENT',
			notificationGroup: commentType,
			notificationTitle: `New comment`,
			notificationDesc: `${authorName} commented your ${commentType} `,
			authorId,
			receiverId,
		});

		await notification.save();
	}

	async createNotificationForFollow(followerId: ObjectId, followingId: ObjectId): Promise<void> {
		// 팔로워와 팔로잉 대상의 정보를 조회
		const follower = await this.memberModel.findById(followerId);
		const following = await this.memberModel.findById(followingId);

		if (!follower || !following) {
			throw new Error('Follower or following member not found');
		}

		// 알림 내용 구성
		const notification = new this.notificationModel({
			notificationType: 'FOLLOW',
			notificationGroup: 'MEMBER', // 팔로우는 'MEMBER' 그룹에 속함
			notificationTitle: `${follower.memberNick} started following you`,
			notificationDesc: `${follower.memberNick} has started following ${following.memberNick}.`,
			authorId: followerId,
			receiverId: followingId,
		});

		// 데이터베이스에 알림 저장
		await notification.save();
	}

	public async createNotificationForUnfollow(followerId: ObjectId, followingId: ObjectId): Promise<void> {
		const follower = await this.memberModel.findById(followerId);
		const following = await this.memberModel.findById(followingId);

		if (!follower || !following) {
			return; // 에러 처리 또는 조용한 실패 처리
		}

		const notification = new this.notificationModel({
			notificationType: 'UNFOLLOW',
			notificationGroup: 'MEMBER',
			notificationTitle: `${follower.memberNick} has stopped following you`,
			notificationDesc: `${follower.memberNick} has stopped following ${following.memberNick}.`,
			authorId: followerId,
			receiverId: followingId,
		});

		await notification.save();
	}

	public async createContactMessage(memberId: ObjectId, input: ContactInput): Promise<void> {
		const title = await this.propertyModel.findById(input.contactRefId);
		const notification = new this.notificationModel({
			notificationType: 'CONTACT',
			notificationGroup: 'MEMBER',
			notificationTitle: `New Message`,
			notificationDesc: ` You have a new message regarding your property ${title.propertyTitle} : Name: ${input.name}, Phone: ${input.phone}, Email: ${input.email},  Message: ${input.message}.`,
			authorId: memberId,
			receiverId: title.memberId,
		});

		await notification.save();
	}
}
