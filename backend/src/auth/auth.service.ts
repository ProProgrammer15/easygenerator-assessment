import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(email: string, name: string, password: string): Promise<any> {
    try {
      await this.usersService.create(email, name, password);
      Logger.log(`User successfully created with email: ${email}`);
      return { message: 'User successfully created' };
    } catch (error) {
      Logger.error(`signUp: ${error.message}`);
      throw new UnauthorizedException(error.message);
    }
  }

  async signIn(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = { email: user.email, sub: user._id };
      const token = this.jwtService.sign(payload);
      return { token };
    } catch (error) {
      Logger.error(`signIn: ${error.message}`);
      throw new UnauthorizedException(error.message);
    }
  }
}
