import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './controllers/file.controller.js';
import { FileService } from './services/file.service.js';

@Module({
  controllers: [FileController],
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [FileService],
})
export class FileModule {}
