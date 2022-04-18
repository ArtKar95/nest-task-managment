import { ITaskStatus } from '../task-status.enum';
export declare class GetTasksFilterDto {
    status?: ITaskStatus;
    search?: string;
}
