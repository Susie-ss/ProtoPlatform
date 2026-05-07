import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProjectsService, Project } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(): Project[] {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Project {
    return this.projectsService.findOne(id);
  }

  @Post()
  create(@Body() body: { name: string; description?: string }): Project {
    return this.projectsService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { name?: string; description?: string },
  ): Project {
    return this.projectsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string): { message: string } {
    this.projectsService.delete(id);
    return { message: 'Project deleted successfully' };
  }
}
