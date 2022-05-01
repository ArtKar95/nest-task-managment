import { GetUserDecorator } from './../auth/get-user.decorator';
import { UserEntity } from './../auth/user.entity';
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
  getTaskById(
    @Param('id') id: string,
    @GetUserDecorator() user: UserEntity,
  ): Promise<EntityTask> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUserDecorator() user: UserEntity,
  ): Promise<EntityTask> {
    return this.tasksService.create(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id') id: string,
    @GetUserDecorator() user: UserEntity,
  ): Promise<void> {
    return this.tasksService.deleteTaskById(id, user);
  }

  @Patch('/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUserDecorator() user: UserEntity,
  ): Promise<EntityTask> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUserDecorator() user: UserEntity,
  ): Promise<EntityTask[]> {
    return this.tasksService.getTasks(filterDto, user);
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
