import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { NewsCategoryCreateDto } from 'src/modules/main/dto/requests/news-category-create.dto'
import { NewsCategoryUpdateDto } from 'src/modules/main/dto/requests/news-category-update.dto'

import { NewsCategoryTranslationEntity } from 'src/modules/main/entities/news-category-translation.entity'
import { NewsCategoryEntity } from 'src/modules/main/entities/news-category.entity'



@Injectable()
export class NewsCategoryService {
  constructor(
    @InjectRepository(NewsCategoryEntity) private newsCategoryRepository: Repository<NewsCategoryEntity>,
    @InjectRepository(NewsCategoryTranslationEntity)
    private newsCategoryTranslationRepository: Repository<NewsCategoryTranslationEntity>,
  ) {}

  async getNewsCategoryById(translationId: string): Promise<NewsCategoryEntity> {
    const newsCategoryTranslation = await this.newsCategoryTranslationRepository.findOne({
      where: { id: translationId },
    })

    const newsCategory = await this.newsCategoryRepository.findOne({
      where: { id: newsCategoryTranslation.newsCategoryId },
      relations: ['translationList'],
    })

    if (!newsCategory) {
      throw new NotFoundException('Not found')
    }

    return newsCategory
  }

  async createNewsCategory(newsCategoryCreateDto: NewsCategoryCreateDto): Promise<NewsCategoryEntity> {
    const { translationList } = newsCategoryCreateDto

    const newsCategory = this.newsCategoryRepository.create()

    await this.newsCategoryRepository.save(newsCategory)

    const translations = translationList.map((translation) => {
      const { title, lang, description } = translation

      const newsCategoryTranslation = this.newsCategoryTranslationRepository.create({
        title,
        lang,
        description,
        category: newsCategory,
      })

      return newsCategoryTranslation
    })

    await this.newsCategoryTranslationRepository.save(translations)

    return newsCategory
  }

  async updateNewsCategory(translationId: string, newsCategoryUpdateDto: NewsCategoryUpdateDto)/*: Promise<void> */{
    const newsCategory = await this.getNewsCategoryById(translationId)

    if (!newsCategory) {
      throw new Error('Категорію новин не знайдено')
    }

    let publishedAt = null
    if (!newsCategory.isPublished && newsCategoryUpdateDto.isPublished) {
      publishedAt = new Date()
    }

    await this.newsCategoryRepository.update(
      { id: newsCategory.id },
      { isPublished: newsCategoryUpdateDto.isPublished, publishedAt },
    )

    for (const translation of newsCategoryUpdateDto.translationList) {
      if (translation.id) {
        await this.newsCategoryTranslationRepository.update({ id: translation.id }, { title: translation.title })
      } else {
        await this.newsCategoryTranslationRepository.create(translation)
      }
    }
    return { message: 'News updated successfully' };
  }

  async deleteNewsCategory(translationId: string)/*: Promise<void>*/ {
    const newsCategory = await this.getNewsCategoryById(translationId)

    if (!newsCategory) {
      throw new NotFoundException('Not found')
    }

    await this.newsCategoryRepository.remove(newsCategory)
    return { message: 'News deleted successfully' };
  }

  async getAll(): Promise<NewsCategoryEntity[]> {
    const newsCategoryList = await this.newsCategoryRepository.find({ relations: ['translationList'] })
    if (!newsCategoryList) {
      throw new NotFoundException('Not found')
    }

    return newsCategoryList
  }
}
