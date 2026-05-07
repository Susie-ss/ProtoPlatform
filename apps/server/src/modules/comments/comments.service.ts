import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { DataService } from '../../common/data.service';

export interface Comment {
  id: string;
  prototypeId: string;
  versionId: string;
  pageIndex: number;
  x?: number;
  y?: number;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  resolved: boolean;
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class CommentsService {
  private dataService: DataService<Comment>;

  constructor(@Inject('DATA_DIR') dataDir: string) {
    this.dataService = new DataService<Comment>(dataDir, 'comments.json');
  }

  findAll(): Comment[] {
    return this.dataService.findAll();
  }

  findByPrototype(prototypeId: string): Comment[] {
    return this.dataService.findAll().filter(c => c.prototypeId === prototypeId);
  }

  findOne(id: string): Comment {
    const comment = this.dataService.findOne(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  create(data: {
    prototypeId: string;
    versionId: string;
    pageIndex: number;
    x?: number;
    y?: number;
    content: string;
    author: { id: string; name: string; avatar?: string };
  }): Comment {
    const now = new Date().toISOString();
    return this.dataService.create({
      ...data,
      resolved: false,
      createdAt: now,
      updatedAt: now,
    });
  }

  resolve(id: string, resolved: boolean): Comment {
    const comment = this.dataService.update(id, {
      resolved,
      updatedAt: new Date().toISOString(),
    });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  delete(id: string): void {
    const success = this.dataService.delete(id);
    if (!success) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}
