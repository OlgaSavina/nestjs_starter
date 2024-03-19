import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { NewsCategory } from './news-category.entity'

@Entity()
export class NewsCategoryTranslationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => NewsCategory, (category) => category.translations)
  category: NewsCategory

  @Column()
  language: string

  @Column()
  title: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string
}
