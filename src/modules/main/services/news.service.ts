import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { Brackets, Repository } from 'typeorm'

import { NewsToItemById, NewsToListItem } from 'src/modules/main/interfaces/news'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper'

@Injectable()
export class NewsService {
  constructor(
    private readonly newsDataMapper: NewsDataMapper,
    @InjectRepository(NewsEntity) private newsRepository: Repository<NewsEntity>,
  ) {}

  async getNewsById(id: string): Promise<{ data: NewsToItemById }> {
    const news = await this.newsRepository.findOne({
      where: { id },
      relations: ['newsCategory'],
    })
    if (!news) {
      throw new NotFoundException('Not found')
    }

    if (!news.published) {
      throw new NotFoundException('News is unpublished', '404')
    }

    return { data: this.newsDataMapper.newsGetById(news) }
  }

  async getAll(
    searchTerm?: string,
    publishedBefore?: string,
    publishedAfter?: string,
    newsCategory?: string,
  ): Promise<{ data: NewsToListItem[] }> {
    const newsQuery = this.newsRepository.createQueryBuilder('news')

    newsQuery.where('news.published = :published', { published: true })

    if (searchTerm) {
      newsQuery.andWhere(
        new Brackets((qb) => {
          qb.where('news.name LIKE :searchTerm', { searchTerm: `%${searchTerm}%` }).orWhere(
            'news.description LIKE :searchTerm',
            { searchTerm: `%${searchTerm}%` },
          )
        }),
      )
    }

    if (publishedAfter) {
      const afterDate = moment(publishedAfter).toDate()

      newsQuery.andWhere('news.publishedAt >= :publishedAfter', { publishedAfter: afterDate })
    }

    if (publishedBefore) {
      const beforeDate = moment(publishedBefore).toDate()

      newsQuery.andWhere('news.publishedAt <= :publishedBefore', { publishedBefore: beforeDate })
    }

    if (newsCategory) {
      newsQuery
        .leftJoinAndSelect('news.newsCategory', 'newsCategory', 'newsCategory.title LIKE :newsCategory', {
          newsCategory: `%${newsCategory}%`,
        })
        .andWhere('newsCategory.title LIKE :newsCategory', { newsCategory: `%${newsCategory}%` })
    }

    const newsList = await newsQuery.getMany()

    if (!newsList.length) {
      throw new NotFoundException('Not found')
    }

    return { data: newsList.map((news) => this.newsDataMapper.newsGetList(news)) }
  }
}
