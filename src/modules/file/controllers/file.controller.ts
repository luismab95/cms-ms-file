import {
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  UseGuards,
  Headers,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard, ServiceResponseI, currentDate } from 'cms-lib-resources';
import { diskStorage } from 'multer';
import { extname } from 'path';
import fs from 'fs';
import { FileI } from '../dto/file.dto.js';
import { FileService } from '../services/file.service.js';

@Controller('file')
@UseGuards(JwtGuard)
export class FileController {
  constructor(private readonly filesService: FileService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const uploadPath = `./uploads/${currentDate('YYYY/MMMM')}/`;
          fs.mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (_req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Headers() headers: any,
    @Body() param: { saveInfo: string },
  ): Promise<ServiceResponseI<FileI>> {
    const token = headers['authorization'];

    if (file === undefined) {
      throw new HttpException('Archivo es requerido', HttpStatus.BAD_REQUEST);
    }

    if (param.saveInfo === 'true')
      await this.filesService.saveInfoFile(file, token);
    return {
      message: file,
      statusCode: HttpStatus.OK,
    };
  }
}
