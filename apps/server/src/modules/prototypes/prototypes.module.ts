import { Module } from '@nestjs/common';
import { PrototypesController } from './prototypes.controller';
import { PrototypesService } from './prototypes.service';

@Module({
  controllers: [PrototypesController],
  providers: [PrototypesService],
  exports: [PrototypesService],
})
export class PrototypesModule {}
