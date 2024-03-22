import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { NewsEntity } from './news.entity'

@Entity()
export class NewsTranslationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => NewsEntity, { eager: true, nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'newsId' })
  news: NewsEntity

  @Column({
    type: 'text',
    nullable: true,
  })
  title: string

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string

  @Column({ nullable: true })
  newsId: string

  @Column({
    nullable: true,
  })
  lang: string

  @Column({ default: '' })
  thumbnailUrl: string
}
