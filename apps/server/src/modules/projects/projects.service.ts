import { Injectable, NotFoundException } from '@nestjs/common';
import { DataService } from '../../common/data.service';

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class ProjectsService {
  private dataService: DataService<Project>;

  constructor(@Inject('DATA_DIR') dataDir: string) {
    this.dataService = new DataService<Project>(dataDir, 'projects.json');
  }

  findAll(): Project[] {
    return this.dataService.findAll();
  }

  findOne(id: string): Project {
    const project = this.dataService.findOne(id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  create(data: { name: string; description?: string }): Project {
    const now = new Date().toISOString();
    return this.dataService.create({
      name: data.name,
      description: data.description,
      createdAt: now,
      updatedAt: now,
    });
  }

  update(id: string, data: { name?: string; description?: string }): Project {
    const project = this.dataService.update(id, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  delete(id: string): void {
    const success = this.dataService.delete(id);
    if (!success) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }
}
