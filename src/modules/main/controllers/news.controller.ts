import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { NewsToItemById, NewsToListItem } from 'src/modules/main/interfaces/news'

import { NewsService } from 'src/modules/main/services/news.service'

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/')
  @ApiOperation({ summary: 'Getting all news' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async getAllNews(): Promise<{ data: NewsToListItem[] }> {
    return await this.newsService.getAll()
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Getting one news by id' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async getNewsById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<{ data: NewsToItemById }> {
    return await this.newsService.getNewsById(id)
  }
}
