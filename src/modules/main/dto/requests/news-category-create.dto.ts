import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { IsArray, IsString, IsUUID } from 'class-validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'

class TranslationDto {
  @ApiProperty({ example: 'Weather' })
  @IsString()
  @Expose()
  title: string

  @ApiProperty({ example: 'Weather' })
  @IsString()
  @Expose()
  description: string

  @ApiProperty({ example: 'Weather' })
  @IsString()
  @Expose()
  lang: string
}

export class NewsCategoryCreateDto extends GenericDto {
  @IsUUID()
  id: string

  @ApiProperty({ example: [{ title: 'Weather' }] })
  @IsArray()
  @Expose()
  translationList: TranslationDto[]
}
