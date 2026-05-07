import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProductLinesService, ProductLine } from './product-lines.service';

@Controller('product-lines')
export class ProductLinesController {
  constructor(private readonly productLinesService: ProductLinesService) {}

  @Get()
  findAll(): ProductLine[] {
    return this.productLinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): ProductLine {
    return this.productLinesService.findOne(id);
  }

  @Post()
  create(@Body() body: { name: string; color?: string; projectId: string }): ProductLine {
    return this.productLinesService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { name?: string; color?: string },
  ): ProductLine {
    return this.productLinesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string): { message: string } {
    this.productLinesService.delete(id);
    return { message: 'ProductLine deleted successfully' };
  }
}
