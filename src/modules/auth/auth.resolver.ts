import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from './args/login.input';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Auth } from './entities/auth.entity';
import { IsPublic } from 'src/decorator/is-public.decorator';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginDto)
  @IsPublic
  login(@Args('credential') input: LoginInput) {
    return this.authService.login(input);
  }
}
