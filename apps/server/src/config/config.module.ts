import { Global, Module } from '@nestjs/common';
import { join } from 'path';

@Global()
@Module({
  providers: [
    {
      provide: 'DATA_DIR',
      useValue: join(process.cwd(), 'data'),
    },
    {
      provide: 'UPLOAD_DIR',
      useValue: join(process.cwd(), 'data', 'uploads'),
    },
  ],
  exports: ['DATA_DIR', 'UPLOAD_DIR'],
})
export class ConfigModule {}
