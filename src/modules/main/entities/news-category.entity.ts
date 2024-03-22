import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { NewsCategoryTranslationEntity } from './news-category-translation.entity'

@Entity()
export class NewsCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(() => NewsCategoryTranslationEntity, (translationList) => translationList.category, {
    onDelete: 'CASCADE',
  })
  translationList: NewsCategoryTranslationEntity[]

  @Column({ name: 'published', default: false })
  isPublished: boolean

  @Column({ name: 'published_at', nullable: true })
  publishedAt: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string
}
