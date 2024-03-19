import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NewsController } from './controllers/news.controller'
import { NewsDataMapper } from './data-mappers/news.data-mapper'
import { NewsCategory } from './entities/news-category.entity'
import { NewsEntity } from './entities/news.entity'
import { NewsService } from './services/news.service'

import { NewsTranslationEntity } from 'src/modules/main/entities/news-translation.entity'
import { ProjectEntity } from 'src/modules/main/entities/project.entity'

import { AppController } from 'src/modules/main/controllers/app.controller'
import { ProjectController } from 'src/modules/main/controllers/project.controller'

import { ProjectService } from 'src/modules/main/services/project.service'

import { ProjectDataMapper } from 'src/modules/main/data-mappers/project.data-mapper'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, NewsEntity, NewsTranslationEntity, NewsCategory]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, ProjectController, NewsController],
  providers: [ProjectService, ProjectDataMapper, NewsDataMapper, NewsService],
})
export class MainModule {}
