import { SignupInput } from './signup.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(SignupInput) {
  @Field(() => Int)
  id: number;
}
