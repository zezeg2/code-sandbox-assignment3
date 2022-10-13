import { Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm/browser';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class BaseEntity {
  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}
