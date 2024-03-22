import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import * as moment from 'moment'

import { NewsCreateDto } from '../dto/requests/news-create.dto'
import { NewsUpdateDto } from '../dto/requests/news-update.dto'

import { NewsToItemById, NewsToListItem } from 'src/modules/main/interfaces/news'

import { NewsService } from 'src/modules/main/services/news.service'

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/list')
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
    @Query('pageSize') pageSize?: number,
    @Query('page') page?: number,
  ) {
    if (publishedBefore && !moment(publishedBefore, 'YYYY-MM-DD', true).isValid()) {
      throw new BadRequestException('Invalid date format. Use YYYY-MM-DD.')
    }

    if (publishedAfter && !moment(publishedAfter, 'YYYY-MM-DD', true).isValid()) {
      throw new BadRequestException('Invalid date format. Use YYYY-MM-DD.')
    }

    return await this.newsService.getAll(searchTerm, publishedBefore, publishedAfter, newsCategory, pageSize, page)
  }

  @Get('item/:id')
  @ApiOperation({ summary: 'Getting one news by id' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async getNewsById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return { data: await this.newsService.getNewsById(id) }
  }

  @Post('/item')
  @ApiBody({
    type: NewsCreateDto,
  })
  async createNews(@Body() newsCreateDto: NewsCreateDto) {
    const createdNews = await this.newsService.createNews(newsCreateDto)

    return { ...createdNews, translationList: newsCreateDto.translationList }
  }

  @Delete('item/:id')
  @ApiOperation({ summary: 'Delete a news' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not found' })
  deleteNews(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<void> {
    return this.newsService.deleteNews(id)
  }

  @Put('item/:id')
  @ApiOperation({ summary: 'Updating news data' })
  @ApiResponse({ status: 202, description: 'Updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async updateChat(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() newsUpdateDto: NewsUpdateDto) {
    return await this.newsService.updateNews(id, newsUpdateDto)
  }
}
