import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommonOutput {
  @Field((type) => Boolean)
  isOK: boolean;

  @Field((type) => String, { nullable: true })
  error?: string;
}
