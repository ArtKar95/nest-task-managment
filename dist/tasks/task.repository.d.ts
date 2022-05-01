import { UserEntity } from './../auth/user.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Repository } from 'typeorm';
import { EntityTask } from './task.entity';
export declare class TaskRepository extends Repository<EntityTask> {
    getTasks(filterDto: GetTasksFilterDto, user: UserEntity): Promise<EntityTask[]>;
    createTask(createTaskDto: CreateTaskDto, user: UserEntity): Promise<EntityTask>;
}
