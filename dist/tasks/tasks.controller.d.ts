import { EntityTask } from './task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getTaskById(id: string): Promise<EntityTask>;
    create(createTaskDto: CreateTaskDto): Promise<EntityTask>;
    deleteTaskById(id: string): Promise<void>;
    updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Promise<EntityTask>;
    getTasks(filterDto: GetTasksFilterDto): Promise<EntityTask[]>;
}
