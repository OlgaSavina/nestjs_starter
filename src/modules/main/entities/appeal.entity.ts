import { AppealType } from 'src/modules/main/enums/appeal.enum'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class AppealEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  email: string

  @Column({ name: 'finished_at' })
  finishedAt: Date

  @Column({ type: 'enum', enum: AppealType })
  type: AppealType

  @Column({ type: 'varchar', length: 10 })
  ipn: string

  @Column({ type: 'int' })
  age: number
}
