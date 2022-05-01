import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() body: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(body);
  }

  @Post('/signin')
  signIn(@Body() body: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(body);
  }
}
