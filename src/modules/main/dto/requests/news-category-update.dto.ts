import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'

class TranslationDto {
  @IsUUID()
  id: string

  @ApiProperty({ example: 'Weather' })
  @IsString()
  @Expose()
  title: string

  @ApiProperty({ example: 'weather' })
  @IsString()
  language?: string
}

export class NewsCategoryUpdateDto extends GenericDto {
  @ApiProperty({ example: [{ title: 'Weather' }] })
  @Expose()
  isPublished: boolean

  @ApiProperty({ example: [{ title: 'Weather' }] })
  @Expose()
  translationList: TranslationDto[]
}
