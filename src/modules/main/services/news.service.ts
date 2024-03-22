import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { Brackets, Repository } from 'typeorm'

import { NewsCreateDto } from '../dto/requests/news-create.dto'
import { NewsUpdateDto } from '../dto/requests/news-update.dto'
import { NewsTranslationEntity } from '../entities/news-translation.entity'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity) private newsRepository: Repository<NewsEntity>,
    @InjectRepository(NewsTranslationEntity) private newsTranslationRepository: Repository<NewsTranslationEntity>,
  ) {}

  async getNewsById(translationId: string): Promise<NewsEntity> {
    const newsTranslation = await this.newsTranslationRepository.findOne({
      where: { id: translationId },
    })

    const news = await this.newsRepository.findOne({
      where: { id: newsTranslation.newsId },
      relations: ['translationList'],
    })

    if (!news) {
      throw new NotFoundException('Not found')
    }

    return news
  }

  async getAll(
    searchTerm?: string,
    publishedBefore?: string,
    publishedAfter?: string,
    newsCategory?: string,
    pageSize = 10,
    page = 1,
  ): Promise<{ data: NewsEntity[]; meta: any }> {
    const newsQuery = this.newsRepository
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.translationList', 'translation')

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

    newsQuery.take(pageSize)
    newsQuery.skip((page - 1) * pageSize)

    const [newsList, total] = await newsQuery.getManyAndCount()

    if (!newsList.length) {
      throw new NotFoundException('Not found')
    }

    return { data: newsList, meta: { total } }
  }

  async updateNews(translationId: string, newsUpdateDto: NewsUpdateDto): Promise<void> {
    const news = await this.getNewsById(translationId)

    if (!news) {
      throw new Error('Not Found')
    }

    let publishedAt = null
    if (!news.isPublished && newsUpdateDto.isPublished) {
      publishedAt = new Date()
    }

    await this.newsRepository.update({ id: news.id }, { isPublished: newsUpdateDto.isPublished, publishedAt })

    for (const translation of newsUpdateDto.translationList) {
      if (translation.id) {
        await this.newsTranslationRepository.update({ id: translation.id }, { title: translation.title })
      } else {
        await this.newsTranslationRepository.create(translation)
      }
    }
  }

  async createNews(newsCreateDto: NewsCreateDto): Promise<NewsEntity> {
    const { publishedAt, categoryId, translationList } = newsCreateDto
    const news = this.newsRepository.create({ publishedAt, categoryId })

    await this.newsRepository.save(news)

    const translations = translationList.map((translation) => {
      const { title, description, lang } = translation
      const newsTranslation = this.newsTranslationRepository.create({ title, description, lang, news: news })

      return newsTranslation
    })

    await this.newsTranslationRepository.save(translations)

    return news
  }

  async deleteNews(translationId: string): Promise<void> {
    const news = await this.getNewsById(translationId)

    if (!news) {
      throw new NotFoundException('Not found')
    }

    await this.newsRepository.remove(news)
  }
}
