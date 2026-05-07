import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PrototypesService, Prototype } from './prototypes.service';

@Controller('prototypes')
export class PrototypesController {
  constructor(private readonly prototypesService: PrototypesService) {}

  @Get()
  findAll(): Prototype[] {
    return this.prototypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Prototype {
    return this.prototypesService.findOne(id);
  }

  @Post()
  create(@Body() body: { name: string; productLineId: string }): Prototype {
    return this.prototypesService.create(body);
  }

  @Post(':id/versions')
  addVersion(
    @Param('id') id: string,
    @Body() body: { version: string; description?: string; filePath: string },
  ): Prototype {
    return this.prototypesService.addVersion(id, body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Prototype>): Prototype {
    return this.prototypesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string): { message: string } {
    this.prototypesService.delete(id);
    return { message: 'Prototype deleted successfully' };
  }
}
