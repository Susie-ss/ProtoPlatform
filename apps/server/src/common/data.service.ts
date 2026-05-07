import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

@Injectable()
export class DataService<T extends { id: string }> {
  constructor(
    private readonly dataDir: string,
    private readonly filename: string,
  ) {
    // Ensure data directory exists
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }
  }

  private getFilePath(): string {
    return join(this.dataDir, this.filename);
  }

  private readAll(): T[] {
    const filePath = this.getFilePath();
    if (!existsSync(filePath)) {
      return [];
    }
    try {
      const content = readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return [];
    }
  }

  private writeAll(items: T[]): void {
    const filePath = this.getFilePath();
    writeFileSync(filePath, JSON.stringify(items, null, 2), 'utf-8');
  }

  findAll(): T[] {
    return this.readAll();
  }

  findOne(id: string): T | undefined {
    const items = this.readAll();
    return items.find((item) => item.id === id);
  }

  create(data: Omit<T, 'id'> & { id?: string }): T {
    const items = this.readAll();
    const newItem = { ...data, id: data.id || this.generateId() } as T;
    items.push(newItem);
    this.writeAll(items);
    return newItem;
  }

  update(id: string, data: Partial<T>): T | undefined {
    const items = this.readAll();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) {
      return undefined;
    }
    items[index] = { ...items[index], ...data };
    this.writeAll(items);
    return items[index];
  }

  delete(id: string): boolean {
    const items = this.readAll();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    }
    items.splice(index, 1);
    this.writeAll(items);
    return true;
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
