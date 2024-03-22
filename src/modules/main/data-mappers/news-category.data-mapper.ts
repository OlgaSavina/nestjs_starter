import { Injectable } from '@nestjs/common'

import { NewsCategory, NewsCategoryToItemById, NewsCategoryToListItem } from 'src/modules/main/interfaces/news'

@Injectable()
export class NewsCategoryDataMapper {
  newsCategoryGetList(entity: NewsCategory): NewsCategoryToListItem {
    const { /* title,*/ createdAt } = entity

    return {
      // title,
      createdAt,
    }
  }

  newsCategoryGetById(entity: NewsCategory): NewsCategoryToItemById {
    const { /* title,*/ createdAt } = entity

    return {
      // title,
      createdAt,
    }
  }
}
