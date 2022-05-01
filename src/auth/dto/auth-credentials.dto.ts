import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
export class AuthCredentialsDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  userName: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=+\-^$*.\[\]{}()?"!@#%&/\\,><':;|_~`])\S{8,99}$/,
    { message: 'Password is too weak!! ' },
  )
  password: string;
}
