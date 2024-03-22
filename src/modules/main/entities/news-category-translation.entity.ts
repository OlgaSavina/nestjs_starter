import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { NewsCategoryEntity } from './news-category.entity'

@Entity()
export class NewsCategoryTranslationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => NewsCategoryEntity, { eager: true, nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'newsCategoryId' })
  category: NewsCategoryEntity

  @Column({ nullable: true })
  lang: string

  @Column()
  title: string

  @Column({ nullable: true })
  newsCategoryId: string

  @Column({ nullable: true })
  description: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string
}
