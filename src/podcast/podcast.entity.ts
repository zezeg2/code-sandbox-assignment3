import { Episode } from '../episode/episode.entity';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@InputType('PodcastInputType', { isAbstract: true })
@ObjectType()
export class Podcast extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  @IsString()
  title: string;

  @Column()
  @Field(() => String)
  @IsString()
  category: string;

  @Column({ nullable: true })
  @Field(() => Number, { nullable: true })
  @IsNumber()
  rating?: number;

  @OneToMany(() => Episode, (episode) => episode.podcast, { cascade: true })
  @Field(() => [Episode], { nullable: true })
  episodes?: Episode[];
}
