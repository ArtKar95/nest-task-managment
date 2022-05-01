import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepo: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(body: AuthCredentialsDto): Promise<void> {
    await this.usersRepo.createUser(body);
  }

  async signIn({
    userName,
    password,
  }: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const user = await this.usersRepo.findOne({ userName });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { userName };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
