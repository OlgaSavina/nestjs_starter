import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { AppealCreateRequestDto } from 'src/modules/main/dto/requests/appeal-create-request.dto'

import { AppealEntity } from 'src/modules/main/entities/appeal.entity'

@Injectable()
export class AppealService {
  constructor(@InjectRepository(AppealEntity) private appealRepository: Repository<AppealEntity>) {}

  async createAppeal(appealCreateRequestDto: AppealCreateRequestDto): Promise<AppealEntity> {
    const appeal = this.appealRepository.create({
      email: appealCreateRequestDto.email,
      finishedAt: appealCreateRequestDto.finishedAt,
      type: appealCreateRequestDto.type,
      ipn: appealCreateRequestDto.ipn,
      age: appealCreateRequestDto.age,
    })

    await this.appealRepository.save(appeal)

    return appeal
  }
}
