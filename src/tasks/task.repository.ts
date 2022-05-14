import { UserEntity } from './../auth/user.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { EntityRepository, Repository } from 'typeorm';
import { EntityTask } from './task.entity';
import { ITaskStatus } from './task-status.enum';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(EntityTask)
export class TaskRepository extends Repository<EntityTask> {
  private logger = new Logger(TaskRepository.name);
  async getTasks(
    filterDto: GetTasksFilterDto,
    user: UserEntity,
  ): Promise<EntityTask[]> {
    const { search, status } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where({ user });

    if (status) {
      query.andWhere('task.status=:status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error('Failed');
      throw new InternalServerErrorException();
    }
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<EntityTask> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: ITaskStatus.OPEN,
      user,
    });
    await this.save(task);
    return task;
  }
}
