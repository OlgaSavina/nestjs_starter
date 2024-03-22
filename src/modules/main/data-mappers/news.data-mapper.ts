import { Injectable } from '@nestjs/common'

import { NewsCategory, NewsToItemById } from 'src/modules/main/interfaces/news'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

@Injectable()
export class NewsDataMapper {
  newsGetList(entity: NewsEntity) {
    const { id, createdAt, publishedAt, isPublished, newsCategory } = entity

    const category: NewsCategory | null = newsCategory
      ? {
          createdAt: newsCategory.createdAt,
        }
      : null

    return {
      id,
      createdAt,
      publishedAt,
      isPublished,
      newsCategory: category,
    }
  }

  newsGetById(entity: NewsEntity): NewsToItemById {
    const { id, createdAt, publishedAt, isPublished, newsCategory } = entity
    const category: NewsCategory | null = newsCategory
      ? {
          createdAt: newsCategory.createdAt,
        }
      : null

    return {
      id,
      createdAt,
      publishedAt,
      isPublished,
      newsCategory: category,
    }
  }
}
