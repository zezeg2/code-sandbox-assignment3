import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PodcastModule } from './podcast/podcast.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeModule } from './episode/episode.module';
import { CommonModule } from './common/common.module';
import { Episode } from './episode/episode.entity';
import { Podcast } from './podcast/podcast.entity';

@Module({
  imports: [
    CommonModule,
    EpisodeModule,
    PodcastModule,
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      logging: true,
      synchronize: true,
      entities: [Podcast, Episode],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
