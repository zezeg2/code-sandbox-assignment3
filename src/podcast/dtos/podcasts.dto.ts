import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Podcast } from '../podcast.entity';
import { CommonOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreatePodcastsInput extends PickType(Podcast, [
  'title',
  'category',
]) {}

@InputType()
export class UpdatePodcastsInput extends PartialType(
  OmitType(Podcast, ['id']),
) {}

@ObjectType()
export class PodcastOutput extends CommonOutput {
  @Field(() => Podcast, { nullable: true })
  podcast?: Podcast;
}

@ObjectType()
export class PodcastListOutput extends CommonOutput {
  @Field(() => [Podcast], { nullable: true })
  podcasts?: Podcast[];
}
