import { IsEnum } from 'class-validator';
import { ITaskStatus } from '../task-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(ITaskStatus)
  status: ITaskStatus;
}
