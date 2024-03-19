import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { NewsEntity } from './news.entity'

@Entity()
export class NewsTranslationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => NewsEntity, (news) => news.translations)
  news: NewsEntity

  @Column()
  language: string

  @Column()
  name: string

  @Column()
  description: string
}
