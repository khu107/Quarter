import { Injectable } from '@nestjs/common';

@Injectable()
export class BatchService {
	public getHello(): string {
		return 'Welcom to nestar BATCH server';
	}

	public async batchRollback(): Promise<void> {
		console.log('batchRollback');
	}

	public async batchProperties(): Promise<void> {
		console.log('batchProperties');
	}

	public async batchAgents(): Promise<void> {
		console.log('batchAgents');
	}
}
