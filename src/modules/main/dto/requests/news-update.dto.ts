import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsArray, IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator'

import { NewsCategoryCreateDto } from './news-category-create.dto'

import { GenericDto } from 'src/core/abstracts/generic.dto'

class NewsTranslationDto {
  @IsUUID()
  id: string

  @ApiProperty({ example: 'weather' })
  @IsString()
  title?: string

  @ApiProperty({ example: 'News about weather' })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ example: 'weather' })
  @IsString()
  thumbnailUrl?: string

  @ApiProperty({ example: 'weather' })
  @IsString()
  lang?: string
}

export class NewsUpdateDto extends GenericDto {
  @IsUUID()
  id: string

  @ApiProperty({ example: '2024-03-01' })
  @IsOptional()
  publishedAt?: string

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  isPublished: boolean

  @ApiProperty({ example: 'a9c72644-7ecd-49b9-b22c-eeffcfd93fa2' })
  @IsOptional()
  categoryId?: string

  @ApiProperty({ type: NewsCategoryCreateDto, required: false })
  @IsOptional()
  @Type(() => NewsCategoryCreateDto)
  newsCategory?: NewsCategoryCreateDto

  @IsArray()
  @Expose()
  translationList: NewsTranslationDto[]
}
