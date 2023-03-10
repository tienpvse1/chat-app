import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field({ nullable: true })
  identifier?: string;

  @Field()
  password: string;
}
