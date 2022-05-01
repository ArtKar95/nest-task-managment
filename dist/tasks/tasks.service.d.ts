import { UserEntity } from './../auth/user.entity';
import { EntityTask } from './task.entity';
import { TaskRepository } from './task.repository';
import { ITaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: TaskRepository);
    getTaskById(id: string, user: UserEntity): Promise<EntityTask>;
    create(createTaskDto: CreateTaskDto, user: UserEntity): Promise<EntityTask>;
    deleteTaskById(id: string, user: UserEntity): Promise<void>;
    updateTaskStatus(id: string, status: ITaskStatus, user: UserEntity): Promise<EntityTask>;
    getTasks(filterDto: GetTasksFilterDto, user: UserEntity): Promise<EntityTask[]>;
}
