import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseDto {
  @Field()
  id: string;

  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
