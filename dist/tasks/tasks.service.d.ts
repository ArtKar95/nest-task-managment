import { EntityTask } from './task.entity';
import { TaskRepository } from './task.repository';
import { ITaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: TaskRepository);
    getTaskById(id: string): Promise<EntityTask>;
    create(createTaskDto: CreateTaskDto): Promise<EntityTask>;
    deleteTaskById(id: string): Promise<void>;
    updateTaskStatus(id: string, status: ITaskStatus): Promise<EntityTask>;
    getTasks(filterDto: GetTasksFilterDto): Promise<EntityTask[]>;
}
