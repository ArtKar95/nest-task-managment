import { UserEntity } from './../auth/user.entity';
import { ITaskStatus } from './task-status.enum';
export declare class EntityTask {
    id: string;
    title: string;
    description: string;
    status: ITaskStatus;
    user: UserEntity;
}
