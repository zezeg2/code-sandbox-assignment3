import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { CreatePodcastsInput, UpdatePodcastsInput } from './dtos/podcasts.dto';
import { NOT_FOUND_PODCAST } from '../podcasts.error-message';
import { Podcast } from './podcast.entity';

@Injectable()
export class PodcastService {
  constructor(
    @InjectRepository(Podcast)
    private readonly podcastRepository: Repository<Podcast>,
  ) {}

  async getAllPodcasts(): Promise<Podcast[]> {
    return await this.podcastRepository.find();
  }

  async getPodcast(id: number): Promise<Podcast> {
    return await this.podcastRepository.findOne({ where: { id } });
  }

  async createPodcast({
    title,
    category,
  }: CreatePodcastsInput): Promise<Podcast> {
    return await this.podcastRepository.save(
      this.podcastRepository.create({ title, category }),
    );
  }

  async patchPodcast(
    id: number,
    updatePodcastsInput: UpdatePodcastsInput,
  ): Promise<Podcast> {
    return await getManager().transaction(async (em) => {
      const podcast = await em.findOne(Podcast, id);
      if (!podcast) throw new Error(NOT_FOUND_PODCAST);
      for (const key in { ...updatePodcastsInput }) {
        podcast[key] = updatePodcastsInput[key];
      }
      return em.save(podcast);
    });
  }

  async deletePodcast(id: number): Promise<void> {
    this.podcastRepository.delete(id).then((r) => console.log(r));
  }
}
