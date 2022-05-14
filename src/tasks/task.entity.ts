import { UserEntity } from './../auth/user.entity';
import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ITaskStatus } from './task-status.enum';
import { Exclude } from 'class-transformer';

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => UserEntity, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: UserEntity;
}
