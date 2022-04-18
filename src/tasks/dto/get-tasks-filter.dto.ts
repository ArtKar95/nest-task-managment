import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ITaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(ITaskStatus)
  status?: ITaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
