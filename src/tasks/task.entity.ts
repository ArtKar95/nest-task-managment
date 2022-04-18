import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { ITaskStatus } from './task-status.enum';

@Entity()
export class EntityTask {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: ITaskStatus;
}
