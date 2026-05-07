import { Module } from '@nestjs/common';
import { ProjectsModule } from './modules/projects/projects.module';
import { ProductLinesModule } from './modules/product-lines/product-lines.module';
import { PrototypesModule } from './modules/prototypes/prototypes.module';
import { CommentsModule } from './modules/comments/comments.module';
import { DesignSystemsModule } from './modules/design-systems/design-systems.module';
import { AIModule } from './modules/ai/ai.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
    ProjectsModule,
    ProductLinesModule,
    PrototypesModule,
    CommentsModule,
    DesignSystemsModule,
    AIModule,
  ],
})
export class AppModule {}
