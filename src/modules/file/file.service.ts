import { Injectable } from '@nestjs/common';
import { config } from 'src/shared/environments/load-env';
import { sendRequestPost } from 'src/shared/helpers/axios.helper';

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
