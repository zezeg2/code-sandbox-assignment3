import { Module } from '@nestjs/common';
import { PodcastService } from './podcast.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Podcast } from './podcast.entity';
import { PodcastResolver } from './podcast.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Podcast])],
  providers: [PodcastService, PodcastResolver],
  exports: [],
})
export class PodcastModule {}
