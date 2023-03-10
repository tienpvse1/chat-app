import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcryptjs';
import { Repository } from 'typeorm';
import { SignupInput } from './args/signup.input';
import { User } from './entities/user.entity';
import {} from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}
  async signup(input: SignupInput) {
    const hashedPassword = hashSync(input.password);
    const createdUser = await this.repository.save({
      ...input,
      password: hashedPassword,
    });
    delete createdUser.password;
    return createdUser;
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }
  findByUsernameOrEmail(username?: string, email?: string) {
    return this.repository.findOne({
      where: [{ email }, { username }],
    });
  }
}
