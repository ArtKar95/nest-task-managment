import { UserEntity } from './../auth/user.entity';
import { EntityTask } from './task.entity';
import { TaskRepository } from './task.repository';
import { ITaskStatus } from './task-status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
// import { v4 as uuid } from 'uuid'; dont need else
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: string, user: UserEntity): Promise<EntityTask> {
    // const task = await this.taskRepository.findOne(id);
    const task = await this.taskRepository.findOne({ where: { id, user } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  create(createTaskDto: CreateTaskDto, user: UserEntity): Promise<EntityTask> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTaskById(id: string, user: UserEntity): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateTaskStatus(
    id: string,
    status: ITaskStatus,
    user: UserEntity,
  ): Promise<EntityTask> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  getTasks(
    filterDto: GetTasksFilterDto,
    user: UserEntity,
  ): Promise<EntityTask[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  /////////////////////////////////////////////////////
  // private tasks: ITask[] = [];
  // getAllTasks(): ITask[] {
  //   return this.tasks;
  // }
  // getTasksFilter(filterDto: GetTasksFilterDto): ITask[] {
  //   const { search, status } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((e) => e.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((t) => {
  //       if (t.title.includes(search) || t.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }
  // create(createTaskDto: CreateTaskDto): ITask {
  //   const { title, description } = createTaskDto;
  //   const task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: ITaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // getTaskById(id: string): ITask {
  //   const task = this.tasks.find((t) => t.id === id);
  //   if (!task) {
  //     throw new NotFoundException(`Task with ID ${id} not found`);
  //   }
  //   return task;
  // }
  // deleteTaskById(id: string): void {
  //   const task = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((t) => t.id !== task.id);
  // }
  // updateTaskStatus(id: string, status: ITaskStatus): ITask {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
