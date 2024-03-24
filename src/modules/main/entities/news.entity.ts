import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { NewsCategoryEntity } from './news-category.entity'
import { NewsTranslationEntity } from './news-translation.entity'

@Entity()
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(() => NewsTranslationEntity, (translation) => translation.news)
  translationList: NewsTranslationEntity[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string

  @Column({ name: 'published_at', nullable: true })
  publishedAt: Date

  @Column({ default: false })
  isPublished: boolean

  @Column({ nullable: true })
  slug: string

  @Column({ default: '' })
  thumbnailUrl: string

  @ManyToOne(() => NewsCategoryEntity, { eager: true, nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'categoryId' })
  newsCategory: NewsCategoryEntity

  @Column({ nullable: true, onUpdate: 'CASCADE' })
  categoryId: string
}
