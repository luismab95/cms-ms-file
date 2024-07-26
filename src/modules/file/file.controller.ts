import {
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { ServiceResponseInterface } from 'src/shared/interfaces/response.interface';
import { FileI } from './dto/file.dto';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';
import { currentDate } from 'src/shared/helpers/string.helper';
import * as fs from 'fs';
import { FileService } from './file.service';

@Controller('file')
@UseGuards(JwtGuard)
export class FileController {
  constructor(private readonly filesService: FileService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
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
  ): Promise<ServiceResponseInterface<FileI>> {
    const token = headers['authorization'];

    if (file === undefined) {
      throw new HttpException('Archivo es requerido', HttpStatus.BAD_REQUEST);
    }

    await this.filesService.saveInfoFile(file, token);
    return {
      message: file,
      statusCode: HttpStatus.OK,
    };
  }
}
