import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { NewsCategory } from './news-category.entity'
import { NewsTranslationEntity } from './news-translation.entity'

@Entity()
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(() => NewsTranslationEntity, (translation) => translation.news)
  translations: NewsTranslationEntity[]

  @Column()
  name: string

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string

  @Column({ name: 'published_at', nullable: true })
  publishedAt: Date

  @Column({ default: false })
  published: boolean

  @ManyToOne(() => NewsCategory, { eager: true, nullable: true })
  @JoinColumn({ name: 'categoryId' })
  newsCategory: NewsCategory

  @Column({ nullable: true })
  categoryId: string
}
