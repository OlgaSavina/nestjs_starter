import { ApiProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { IsArray, IsOptional, IsString } from 'class-validator'

import { NewsCategoryCreateDto } from './news-category-create.dto'

import { GenericDto } from 'src/core/abstracts/generic.dto'

class NewsTranslationDto {
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

export class NewsCreateDto extends GenericDto {
  @ApiProperty({ example: 'weather' })
  @IsString()
  slug?: string

  @ApiProperty({ example: 'weather' })
  @IsString()
  thumbnailUrl?: string

  @IsArray()
  @Expose()
  translationList: NewsTranslationDto[]

  @ApiProperty({ example: '2024-03-01' })
  @IsOptional()
  publishedAt?: string

  /* @ApiProperty({ example: 'true' })
  @IsBoolean()
  published?: boolean*/

  @ApiProperty({ example: 'a9c72644-7ecd-49b9-b22c-eeffcfd93fa2' })
  @IsOptional()
  categoryId?: string

  @ApiProperty({ type: NewsCategoryCreateDto, required: false })
  @IsOptional()
  @Type(() => NewsCategoryCreateDto)
  newsCategory?: NewsCategoryCreateDto
}
