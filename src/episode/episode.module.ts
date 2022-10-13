import { Module } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { EpisodeResolver } from './episode.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from './episode.entity';
import { Podcast } from '../podcast/podcast.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Podcast, Episode])],
  providers: [EpisodeService, EpisodeResolver],
  exports: [],
})
export class EpisodeModule {}
