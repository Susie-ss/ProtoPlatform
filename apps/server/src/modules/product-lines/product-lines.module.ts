import { Module } from '@nestjs/common';
import { ProductLinesController } from './product-lines.controller';
import { ProductLinesService } from './product-lines.service';

@Module({
  controllers: [ProductLinesController],
  providers: [ProductLinesService],
  exports: [ProductLinesService],
})
export class ProductLinesModule {}
