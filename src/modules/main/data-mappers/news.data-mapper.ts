import { Injectable } from '@nestjs/common'

import { NewsCategory, NewsToItemById, NewsToListItem } from 'src/modules/main/interfaces/news'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

@Injectable()
export class NewsDataMapper {
  newsGetList(entity: NewsEntity): NewsToListItem {
    const { id, name, description, createdAt, publishedAt, published, newsCategory } = entity

    const category: NewsCategory | null = newsCategory
      ? {
          title: newsCategory.title,
          createdAt: newsCategory.createdAt,
        }
      : null

    return {
      id,
      name,
      description,
      createdAt,
      publishedAt,
      published,
      newsCategory: category,
    }
  }

  newsGetById(entity: NewsEntity): NewsToItemById {
    const { id, name, description, createdAt, publishedAt, published, newsCategory } = entity
    const category: NewsCategory | null = newsCategory
      ? {
          title: newsCategory.title,
          createdAt: newsCategory.createdAt,
        }
      : null

    return {
      id,
      name,
      description,
      createdAt,
      publishedAt,
      published,
      newsCategory: category,
    }
  }
}
