import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'
import { Brackets, Repository } from 'typeorm'

import { NewsCreateDto } from 'src/modules/main/dto/requests/news-create.dto'
import { NewsUpdateDto } from 'src/modules/main/dto/requests/news-update.dto'

import { NewsCategoryTranslationEntity } from 'src/modules/main/entities/news-category-translation.entity'
import { NewsTranslationEntity } from 'src/modules/main/entities/news-translation.entity'
import { NewsEntity } from 'src/modules/main/entities/news.entity'

import { NewsCategoryService } from 'src/modules/main/services/news-category.service'

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity) private newsRepository: Repository<NewsEntity>,
    private newsCategoryService: NewsCategoryService,
    @InjectRepository(NewsCategoryTranslationEntity)
    private newsCategoryTranslationRepository: Repository<NewsCategoryTranslationEntity>,
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
    sortColumn: string = '',
    sortDirection: 'ASC' | 'DESC'= 'ASC',
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
          qb.where('translation.title LIKE :searchTerm', { searchTerm: `%${searchTerm}%` }).orWhere(
            'translation.description LIKE :searchTerm',
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


    if (sortColumn && sortDirection) {
      newsQuery.orderBy(`news.${sortColumn}`, sortDirection);
    }

    newsQuery
      .leftJoinAndSelect('news.newsCategory', 'newsCategory')
      .leftJoin('newsCategory.translationList', 'categoryTranslation')

    if (newsCategory) {
      newsQuery.andWhere('categoryTranslation.id = :newsCategoryTranslationId', {
        newsCategoryTranslationId: newsCategory,
      })
    }

    newsQuery.take(pageSize)
    newsQuery.skip((page - 1) * pageSize)

    const [newsList, total] = await newsQuery.getManyAndCount()

    if (!newsList.length) {
      return { data: [], meta: 0 }
    }

    return { data: newsList, meta: { total } }
  }

  async updateNews(translationId: string, newsUpdateDto: NewsUpdateDto)/*: Promise<void>*/ {
    const news = await this.getNewsById(translationId)

    if (!news) {
      throw new Error('Not Found')
    }

    let publishedAt = null
    if (!news.isPublished && newsUpdateDto.isPublished) {
      publishedAt = new Date()
    }

    const category = await this.newsCategoryService.getNewsCategoryById(newsUpdateDto.newsCategory.id)

    await this.newsRepository.update(
      { id: news.id },
      { isPublished: newsUpdateDto.isPublished, publishedAt, categoryId: category.id },
    )

    for (const translation of newsUpdateDto.translationList) {
      if (translation.id) {
        await this.newsTranslationRepository.update({ id: translation.id }, { title: translation.title })
      } else {
        await this.newsTranslationRepository.create(translation)
        
      }
    }
    return { message: 'News updated successfully' };
  }

  async createNews(newsCreateDto: NewsCreateDto): Promise<NewsEntity> {
    const { publishedAt, categoryId, newsCategory, translationList } = newsCreateDto
    const news = this.newsRepository.create({ publishedAt, categoryId, newsCategory })

    await this.newsRepository.save(news)

    const translations = translationList.map((translation) => {
      const { title, description, lang } = translation
      const newsTranslation = this.newsTranslationRepository.create({ title, description, lang, news: news })

      return newsTranslation
    })

    await this.newsTranslationRepository.save(translations)

    return  news
  }

  async deleteNews(translationId: string)/*: Promise<void>*/ {
    const news = await this.getNewsById(translationId)

    if (!news) {
      throw new NotFoundException('Not found')
    }

    await this.newsRepository.remove(news)
    return { message: 'News deleted successfully' };
    
  }
}
