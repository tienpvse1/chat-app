import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { BaseDto } from 'src/base/dto.base';

@ObjectType()
export class UserDto extends BaseDto {
  @Field()
  username: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => GraphQLJSON, { nullable: true })
  customData: object;
}
