import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

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
    })
    if (!news) {
      throw new NotFoundException('Not found')
    }

    if (!news.published) {
      throw new NotFoundException('News is unpublished', '404')
    }

    return { data: this.newsDataMapper.newsGetById(news) }
  }

  async getAll(): Promise<{ data: NewsToListItem[] }> {
    const newsList = await this.newsRepository.find({
      where: { published: true },
      order: {
        createdAt: 'DESC',
      },
    })
    if (!newsList) {
      throw new NotFoundException('Not found')
    }

    return { data: newsList.map((project) => this.newsDataMapper.newsGetList(project)) }
  }
}
