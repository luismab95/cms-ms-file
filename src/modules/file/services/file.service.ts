import { Injectable } from '@nestjs/common';
import { sendRequestPost } from 'cms-lib-resources';
import { config } from '@shared/environments/load-env.js';

@Injectable()
export class FileService {
  async saveInfoFile(file: Express.Multer.File, token: string) {
    const { msCms } = config.server;
    await sendRequestPost(
      `${msCms}/files`,
      {
        name: file.originalname.substring(
          0,
          file.originalname.lastIndexOf('.'),
        ),
        description: file.originalname.substring(
          0,
          file.originalname.lastIndexOf('.'),
        ),
        filename: file.filename,
        mimeType: file.mimetype,
        path: file.path,
        size: file.size,
      },
      { headers: { Authorization: token } },
    );
  }
}
