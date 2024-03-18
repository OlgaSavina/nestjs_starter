import { Injectable } from '@nestjs/common'

import { NewsToItemById, NewsToListItem } from 'src/modules/main/interfaces/news'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

@Injectable()
export class NewsDataMapper {
  newsGetList(entity: NewsEntity): NewsToListItem {
    const { id, name, description, createdAt, publishedAt, published } = entity

    return {
      id,
      name,
      description,
      createdAt,
      publishedAt,
      published,
    }
  }

  newsGetById(entity: NewsEntity): NewsToItemById {
    const { id, name, description, createdAt, publishedAt, published } = entity

    return {
      id,
      name,
      description,
      createdAt,
      publishedAt,
      published,
    }
  }
}
