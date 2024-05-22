import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { NewsCategoryCreateDto } from 'src/modules/main/dto/requests/news-category-create.dto'
import { NewsCategoryUpdateDto } from 'src/modules/main/dto/requests/news-category-update.dto'

import { NewsCategoryEntity } from 'src/modules/main/entities/news-category.entity'

import { NewsCategoryService } from 'src/modules/main/services/news-category.service'

@ApiTags('News Category')
@Controller('news-category')
export class NewsCategoryController {
  constructor(private readonly newsCategoryService: NewsCategoryService) {}

  @Get('/list')
  @ApiOperation({ summary: 'Get all news categories' })
  @ApiResponse({ status: 200, description: 'OK' })
  async getAll(): Promise<{ data: NewsCategoryEntity[]; meta: object }> {
    const data = await this.newsCategoryService.getAll()

    return { data, meta: { total: 10 } }
  }

  @Get('/reference')
  @ApiOperation({ summary: 'Get all news categories' })
  @ApiResponse({ status: 200, description: 'OK' })
  async getAllReferences(): Promise<{ data: NewsCategoryEntity[] }> {
    const data = await this.newsCategoryService.getAll()

    return { data: data }
  }

  @Get('item/:id')
  @ApiOperation({ summary: 'Getting one news category by id' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async getNewsCategoryById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<{ data: NewsCategoryEntity }> {
    return { data: await this.newsCategoryService.getNewsCategoryById(id) }
  }

  @Post('/item')
  @ApiOperation({ summary: 'Create news category' })
  @ApiBody({
    type: NewsCategoryCreateDto,
  })
  async createNewsCategory(@Body() newsCategoryCreateDto: NewsCategoryCreateDto): Promise<any> {
    const createdNewsCategory = await this.newsCategoryService.createNewsCategory(newsCategoryCreateDto)

    return { ...createdNewsCategory, translationList: newsCategoryCreateDto.translationList }
  }

  @Delete('item/:id')
  @ApiOperation({ summary: 'Delete a news category' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 404, description: 'Not found' })
  deleteNews(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string)/*: Promise<void> */{
    return  this.newsCategoryService.deleteNewsCategory(id)
  }

  @Put('item/:id')
  @ApiOperation({ summary: 'Updating news data' })
  @ApiResponse({ status: 202, description: 'Updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async updateChat(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() newsCategoryUpdateDto: NewsCategoryUpdateDto,
  )/*: Promise<void>*/ {
    return { data: await this.newsCategoryService.updateNewsCategory(id, newsCategoryUpdateDto)}
  }
}
