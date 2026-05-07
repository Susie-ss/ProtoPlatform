import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CommentsService, Comment } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findAll(@Query('prototypeId') prototypeId?: string): Comment[] {
    if (prototypeId) {
      return this.commentsService.findByPrototype(prototypeId);
    }
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Comment {
    return this.commentsService.findOne(id);
  }

  @Post()
  create(@Body() body: {
    prototypeId: string;
    versionId: string;
    pageIndex: number;
    x?: number;
    y?: number;
    content: string;
    author: { id: string; name: string; avatar?: string };
  }): Comment {
    return this.commentsService.create(body);
  }

  @Put(':id/resolve')
  resolve(@Param('id') id: string, @Body() body: { resolved: boolean }): Comment {
    return this.commentsService.resolve(id, body.resolved);
  }

  @Delete(':id')
  delete(@Param('id') id: string): { message: string } {
    this.commentsService.delete(id);
    return { message: 'Comment deleted successfully' };
  }
}
