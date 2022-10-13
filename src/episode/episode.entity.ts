import { InputType, ObjectType, Field } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Podcast } from '../podcast/podcast.entity';

@InputType('EpisodeInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Episode extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  category: string;

  @ManyToOne(() => Podcast, (podcast) => podcast.episodes)
  podcast!: Podcast;
}
