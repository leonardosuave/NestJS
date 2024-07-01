import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { ForgetPasswordDTO } from './dto/forget-password.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { ResetPasswordDTO } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async longin(@Body() { email, password }: AuthLoginDTO) {
    return await this.authService.login({ email, password });
  }

  @Post('register')
  async register(@Body() data: AuthRegisterDTO) {
    return await this.authService.register(data);
  }

  @Post('forget-password')
  async forgetPassword(@Body() email: ForgetPasswordDTO) {
    await this.authService.forgetPassword(email);
    return;
  }

  @Post('reset-password')
  async resetPassword(@Body() data: ResetPasswordDTO) {
    await this.authService.resetPassword(data);
    return;
  }
}
