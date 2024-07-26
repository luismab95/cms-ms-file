import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { FileService } from './file.service';

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
