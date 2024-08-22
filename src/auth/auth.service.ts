import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private users = [{ id: 1, username: 'user', password: 'password' }];

  validateUser(username: string, password: string): boolean {
    const user = this.users.find(
      (user) => user.username === username && user.password === password,
    );
    return !!user;
  }
}
