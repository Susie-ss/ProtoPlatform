import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { DataService } from '../../common/data.service';

export interface ProductLine {
  id: string;
  name: string;
  color: string;
  projectId: string;
  prototypeCount: number;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class ProductLinesService {
  private dataService: DataService<ProductLine>;

  constructor(@Inject('DATA_DIR') dataDir: string) {
    this.dataService = new DataService<ProductLine>(dataDir, 'product-lines.json');
  }

  findAll(): ProductLine[] {
    return this.dataService.findAll();
  }

  findOne(id: string): ProductLine {
    const productLine = this.dataService.findOne(id);
    if (!productLine) {
      throw new NotFoundException(`ProductLine with ID ${id} not found`);
    }
    return productLine;
  }

  create(data: { name: string; color?: string; projectId: string }): ProductLine {
    const now = new Date().toISOString();
    return this.dataService.create({
      name: data.name,
      color: data.color || '#5B5EF4',
      projectId: data.projectId,
      prototypeCount: 0,
      createdAt: now,
      updatedAt: now,
    });
  }

  update(id: string, data: { name?: string; color?: string }): ProductLine {
    const productLine = this.dataService.update(id, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    if (!productLine) {
      throw new NotFoundException(`ProductLine with ID ${id} not found`);
    }
    return productLine;
  }

  delete(id: string): void {
    const success = this.dataService.delete(id);
    if (!success) {
      throw new NotFoundException(`ProductLine with ID ${id} not found`);
    }
  }
}
