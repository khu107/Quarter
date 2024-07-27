import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { NotificationInput } from '../../libs/dto/notification/notification.input';
import { Notification } from '../../libs/dto/notification/notification';

@Resolver()
export class NotificationResolver {
	constructor(private readonly notificationService: NotificationService) {}

	@Mutation(() => Notification)
	async createNotification(@Args('input') input: NotificationInput): Promise<Notification> {
		return await this.notificationService.createNotification(input);
	}

	@Query(() => [Notification])
	async getNotifications(): Promise<Notification[]> {
		return await this.notificationService.getNotifications();
	}

	@Mutation(() => [Notification])
	async markNotificationsAsRead(@Args({ name: 'ids', type: () => [String] }) ids: string[]): Promise<Notification[]> {
		return this.notificationService.markNotificationsAsRead(ids);
	}
}
