import { UserEntity } from './../auth/user.entity';
import { EntityTask } from './task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getTaskById(id: string, user: UserEntity): Promise<EntityTask>;
    create(createTaskDto: CreateTaskDto, user: UserEntity): Promise<EntityTask>;
    deleteTaskById(id: string, user: UserEntity): Promise<void>;
    updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto, user: UserEntity): Promise<EntityTask>;
    getTasks(filterDto: GetTasksFilterDto, user: UserEntity): Promise<EntityTask[]>;
}
