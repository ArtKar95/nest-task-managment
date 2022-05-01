import { UserEntity } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async createUser({ userName, password }: AuthCredentialsDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ userName, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code == 23505) {
        throw new ConflictException('User Exist');
      }
      throw new InternalServerErrorException();
    }
  }
}
