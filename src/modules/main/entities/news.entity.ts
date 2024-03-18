import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { NewsTranslationEntity } from './newstranslation.entity'

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
  })
  description: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string

  @Column({ name: 'published_at', nullable: true })
  publishedAt: Date

  @Column({ default: false })
  published: boolean
}
