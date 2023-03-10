import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginDto {
  @Field()
  access_token: string;
  @Field({ nullable: true })
  refresh_token: string;
}
