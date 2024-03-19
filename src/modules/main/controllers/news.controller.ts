import { BadRequestException, Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import * as moment from 'moment'

import { NewsToItemById, NewsToListItem } from 'src/modules/main/interfaces/news'

import { NewsService } from 'src/modules/main/services/news.service'

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/')
  @ApiOperation({ summary: 'Getting all news' })
  @ApiQuery({ name: 'searchTerm', required: false })
  @ApiQuery({ name: 'publishedBefore', required: false, description: 'example: 2023-01-01' })
  @ApiQuery({ name: 'publishedAfter', required: false, description: 'example: 2023-01-01' })
  @ApiQuery({ name: 'newsCategory', required: false })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async getAllNews(
    @Query('searchTerm') searchTerm?: string,
    @Query('publishedBefore') publishedBefore?: string,
    @Query('publishedAfter') publishedAfter?: string,
    @Query('newsCategory') newsCategory?: string,
  ): Promise<{ data: NewsToListItem[] }> {
    if (publishedBefore && !moment(publishedBefore, 'YYYY-MM-DD', true).isValid()) {
      throw new BadRequestException('Invalid date format. Use YYYY-MM-DD.')
    }

    if (publishedAfter && !moment(publishedAfter, 'YYYY-MM-DD', true).isValid()) {
      throw new BadRequestException('Invalid date format. Use YYYY-MM-DD.')
    }

    return await this.newsService.getAll(searchTerm, publishedBefore, publishedAfter, newsCategory)
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Getting one news by id' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async getNewsById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<{ data: NewsToItemById }> {
    return await this.newsService.getNewsById(id)
  }
}
