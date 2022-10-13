import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PodcastService } from './podcast.service';
import {
  CreatePodcastsInput,
  PodcastListOutput,
  PodcastOutput,
  UpdatePodcastsInput,
} from './dtos/podcasts.dto';
import { CommonOutput } from '../common/dtos/output.dto';
import { NOT_FOUND_PODCAST } from '../podcasts.error-message';
import { Podcast } from './podcast.entity';

@Resolver(() => Podcast)
export class PodcastResolver {
  constructor(private readonly podcastsService: PodcastService) {}

  @Query(() => PodcastListOutput)
  async getAllPodcasts(): Promise<PodcastListOutput> {
    return {
      isOK: true,
      podcasts: await this.podcastsService.getAllPodcasts(),
    };
  }
  @Query(() => PodcastOutput)
  async getPodcast(@Args('id') id: number): Promise<PodcastOutput> {
    const podcast = await this.podcastsService.getPodcast(id);
    if (!podcast) return { isOK: false, error: NOT_FOUND_PODCAST };
    return { isOK: true, podcast };
  }

  @Mutation(() => PodcastOutput)
  async createPodcast(
    @Args('input') input: CreatePodcastsInput,
  ): Promise<PodcastOutput> {
    return {
      isOK: true,
      podcast: await this.podcastsService.createPodcast(input),
    };
  }

  @Mutation(() => PodcastOutput)
  async patchPodcast(
    @Args('id') id: number,
    @Args('input') input: UpdatePodcastsInput,
  ): Promise<PodcastOutput> {
    try {
      const podcast = await this.podcastsService.patchPodcast(id, input);
      return { isOK: true, podcast };
    } catch (error) {
      return { isOK: false, error: error.message };
    }
  }

  @Mutation(() => CommonOutput)
  async deletePodcast(@Args('id') id: number): Promise<CommonOutput> {
    await this.podcastsService.deletePodcast(id);
    return { isOK: true };
  }
}
