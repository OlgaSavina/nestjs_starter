import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppealController } from './controllers/appeal.controller'
import { NewsCategoryController } from './controllers/news-category.controller'
import { NewsController } from './controllers/news.controller'
import { NewsCategoryDataMapper } from './data-mappers/news-category.data-mapper'
import { NewsDataMapper } from './data-mappers/news.data-mapper'
import { AppealEntity } from './entities/appeal.entity'
import { NewsCategoryTranslationEntity } from './entities/news-category-translation.entity'
import { NewsCategoryEntity } from './entities/news-category.entity'
import { NewsEntity } from './entities/news.entity'
import { AppealService } from './services/appeal.service'
import { NewsCategoryService } from './services/news-category.service'
import { NewsService } from './services/news.service'

import { NewsTranslationEntity } from 'src/modules/main/entities/news-translation.entity'
import { ProjectEntity } from 'src/modules/main/entities/project.entity'

import { AppController } from 'src/modules/main/controllers/app.controller'
import { ProjectController } from 'src/modules/main/controllers/project.controller'

import { ProjectService } from 'src/modules/main/services/project.service'

import { ProjectDataMapper } from 'src/modules/main/data-mappers/project.data-mapper'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectEntity,
      NewsEntity,
      NewsTranslationEntity,
      NewsCategoryEntity,
      NewsCategoryTranslationEntity,
      AppealEntity,
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, ProjectController, NewsController, NewsCategoryController, AppealController],
  providers: [
    ProjectService,
    ProjectDataMapper,
    NewsDataMapper,
    NewsCategoryDataMapper,
    NewsService,
    NewsCategoryService,
    AppealService,
  ],
})
export class MainModule {}
