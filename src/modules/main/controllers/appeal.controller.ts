import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AppealCreateRequestDto } from 'src/modules/main/dto/requests/appeal-create-request.dto'

import { AppealEntity } from 'src/modules/main/entities/appeal.entity'

import { AppealService } from 'src/modules/main/services/appeal.service'

@ApiTags('Appeals')
@Controller('appeals')
export class AppealController {
  constructor(private readonly appealService: AppealService) {}

  @Post()
  async createAppeal(@Body() appealCreateRequestDto: AppealCreateRequestDto): Promise<AppealEntity> {
    return await this.appealService.createAppeal(appealCreateRequestDto)
  }
}
