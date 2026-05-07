import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { DataService } from '../../common/data.service';

export interface Version {
  id: string;
  version: string;
  description?: string;
  filePath: string;
  createdAt: string;
}

export interface Prototype {
  id: string;
  name: string;
  productLineId: string;
  coverImage?: string;
  shareToken?: string;
  sharePassword?: string;
  versions: Version[];
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class PrototypesService {
  private dataService: DataService<Prototype>;

  constructor(@Inject('DATA_DIR') dataDir: string) {
    this.dataService = new DataService<Prototype>(dataDir, 'prototypes.json');
  }

  findAll(): Prototype[] {
    return this.dataService.findAll();
  }

  findOne(id: string): Prototype {
    const prototype = this.dataService.findOne(id);
    if (!prototype) {
      throw new NotFoundException(`Prototype with ID ${id} not found`);
    }
    return prototype;
  }

  create(data: { name: string; productLineId: string }): Prototype {
    const now = new Date().toISOString();
    return this.dataService.create({
      name: data.name,
      productLineId: data.productLineId,
      versions: [],
      createdAt: now,
      updatedAt: now,
    });
  }

  addVersion(id: string, data: { version: string; description?: string; filePath: string }): Prototype {
    const prototype = this.findOne(id);
    const newVersion: Version = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      version: data.version,
      description: data.description,
      filePath: data.filePath,
      createdAt: new Date().toISOString(),
    };
    return this.dataService.update(id, {
      versions: [...prototype.versions, newVersion],
      updatedAt: new Date().toISOString(),
    })!;
  }

  update(id: string, data: Partial<Prototype>): Prototype {
    const prototype = this.dataService.update(id, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    if (!prototype) {
      throw new NotFoundException(`Prototype with ID ${id} not found`);
    }
    return prototype;
  }

  delete(id: string): void {
    const success = this.dataService.delete(id);
    if (!success) {
      throw new NotFoundException(`Prototype with ID ${id} not found`);
    }
  }
}
