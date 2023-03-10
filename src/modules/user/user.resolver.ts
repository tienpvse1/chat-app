import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SignupInput } from './args/signup.input';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { IsPublic } from 'src/decorator/is-public.decorator';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserDto)
  @IsPublic
  signup(@Args('input') input: SignupInput) {
    return this.userService.signup(input);
  }

  @Query(() => [UserDto], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserDto, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }
}
