import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { EntityRepository, Repository } from 'typeorm';
import { EntityTask } from './task.entity';
import { ITaskStatus } from './task-status.enum';

@EntityRepository(EntityTask)
export class TaskRepository extends Repository<EntityTask> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<EntityTask[]> {
    const { search, status } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status=:status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<EntityTask> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: ITaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  }
}
