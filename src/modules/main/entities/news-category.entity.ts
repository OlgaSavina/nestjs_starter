import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { NewsTranslationEntity } from './news-translation.entity'

@Entity()
export class NewsCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(() => NewsTranslationEntity, (translation) => translation.news)
  translations: NewsTranslationEntity[]

  @Column()
  title: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string
}
