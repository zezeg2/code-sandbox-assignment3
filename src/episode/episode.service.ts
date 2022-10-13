import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Episode } from './episode.entity';
import { getManager, Repository } from 'typeorm';
import { CreateEpisodesInput, UpdateEpisodesInput } from './dtos/episodes.dto';
import { Podcast } from '../podcast/podcast.entity';
import { NOT_FOUND_PODCAST } from '../podcasts.error-message';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectRepository(Podcast)
    private readonly podcastRepository: Repository<Podcast>,
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>,
  ) {}

  async getEpisode(id: number): Promise<Episode> {
    return await this.episodeRepository.findOne({ where: { id } });
  }

  async getEpisodes(podcastId: number): Promise<Episode[]> {
    const episodes = await this.podcastRepository
      .findOne({
        where: { id: podcastId },
      })
      .then((r) => r.episodes);
    if (!episodes) throw new Error(NOT_FOUND_PODCAST);
    return episodes;
  }

  async createEpisode(
    podcastId: number,
    { title, category }: CreateEpisodesInput,
  ): Promise<Episode> {
    return await getManager().transaction(async (em) => {
      const podcast = await em.findOne(Podcast, podcastId);
      if (!podcast) throw new Error(NOT_FOUND_PODCAST);
      const episode = await this.episodeRepository.create({
        title,
        category,
        podcast,
      });
      podcast.episodes;
      return await this.episodeRepository.save(episode);
    });
  }

  async patchEpisode(
    podcastId: number,
    episodeId: number,
    updateEpisodesInput: UpdateEpisodesInput,
  ): Promise<Episode> {
    return await getManager().transaction(async (em) => {
      if (!(await this.podcastRepository.findOne(podcastId))) {
        throw new Error(NOT_FOUND_PODCAST);
      }
      const episode = await em.findOne(Episode, episodeId);
      for (const key in { ...updateEpisodesInput }) {
        episode[key] = updateEpisodesInput[key];
      }
      return await em.save(episode);
    });
  }

  async deleteEpisode(podcastId: number, episodeId: number) {
    if (!(await this.podcastRepository.findOne(podcastId))) {
      throw new Error(NOT_FOUND_PODCAST);
    }
    await this.episodeRepository.delete(episodeId).then((r) => console.log(r));
  }
}
