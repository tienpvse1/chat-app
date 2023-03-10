import { Field, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { UniqueInDatabase } from '../decorators/unique-in-database.decorator';
import { IsEmail } from 'class-validator';

@InputType()
export class SignupInput {
  @Field()
  @IsEmail()
  @UniqueInDatabase({ message: 'email has already been taken' })
  email: string;

  @Field()
  password: string;

  @Field()
  @UniqueInDatabase({ message: 'username has already been taken' })
  username: string;

  @Field(() => GraphQLJSON, { nullable: true })
  customData?: object;
}
