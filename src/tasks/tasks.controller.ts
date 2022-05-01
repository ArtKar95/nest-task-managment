import { EntityTask } from './task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<EntityTask> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<EntityTask> {
    return this.tasksService.create(createTaskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<EntityTask> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<EntityTask[]> {
    return this.tasksService.getTasks(filterDto);
  }

  //////////////////////////////////////////////////////////////
  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto): ITask[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksFilter(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  // @Post()
  // create(@Body() createTaskDto: CreateTaskDto): ITask {
  //   return this.tasksService.create(createTaskDto);
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): ITask {
  //   return this.tasksService.getTaskById(id);
  // }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string): void {
  //   return this.tasksService.deleteTaskById(id);
  // }

  // @Patch('/:id')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ): ITask {
  //   const { status } = updateTaskStatusDto;
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
