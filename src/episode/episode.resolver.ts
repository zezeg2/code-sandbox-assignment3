import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EpisodeService } from './episode.service';
import {
  CreateEpisodesInput,
  EpisodeListOutput,
  EpisodeOutput,
  UpdateEpisodesInput,
} from './dtos/episodes.dto';
import { CommonOutput } from '../common/dtos/output.dto';

@Resolver()
export class EpisodeResolver {
  constructor(private readonly episodeService: EpisodeService) {}
  @Query(() => EpisodeListOutput)
  async getEpisodes(@Args('id') id: number): Promise<EpisodeListOutput> {
    try {
      const episodes = await this.episodeService.getEpisodes(id);
      return { isOK: true, episodes };
    } catch (error) {
      return { isOK: false, error: error.message };
    }
  }

  @Mutation(() => EpisodeOutput)
  async createEpisode(
    @Args('id') id: number,
    @Args('input') input: CreateEpisodesInput,
  ): Promise<EpisodeOutput> {
    try {
      const episode = await this.episodeService.createEpisode(id, input);
      return { isOK: true, episode };
    } catch (error) {
      return { isOK: false, error: error.message };
    }
  }

  @Mutation(() => EpisodeOutput)
  async patchEpisode(
    @Args('podcastId') podcastId: number,
    @Args('episodeId') episodeId: number,
    @Args('input') updateEpisodesInput: UpdateEpisodesInput,
  ): Promise<EpisodeOutput> {
    try {
      const episode = await this.episodeService.patchEpisode(
        podcastId,
        episodeId,
        updateEpisodesInput,
      );
      return { isOK: true, episode };
    } catch (error) {
      return { isOK: false, error: error.message };
    }
  }

  @Mutation(() => CommonOutput)
  async deleteEpisode(
    @Args('podcastId') podcastId: number,
    @Args('episodeId') episodeId: number,
  ): Promise<CommonOutput> {
    try {
      await this.episodeService.deleteEpisode(podcastId, episodeId);
      return { isOK: true };
    } catch (error) {
      return { isOK: false, error: error.message };
    }
  }
}
