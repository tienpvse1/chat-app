import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { UserService } from '../user/user.service';
import { LoginInput } from './args/login.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}
  async login(input: LoginInput) {
    const user = await this.userService.findByUsernameOrEmail(
      input.identifier,
      input.identifier,
    );
    if (!user)
      throw new UnauthorizedException('user with email/username not found');
    const isPasswordValid = compareSync(input.password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('password is invalid');
    const signedToken = this.jwt.sign({
      sub: user.id,
      email: user.email,
      username: user.email,
      custom_data: user.customData,
    });
    return { access_token: signedToken };
  }
}
