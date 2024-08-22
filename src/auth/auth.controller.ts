import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    const isValid = this.authService.validateUser(body.username, body.password);
    if (isValid) {
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  }
}
