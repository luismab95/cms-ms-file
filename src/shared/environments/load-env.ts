import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  server: {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    msCms: process.env.MS_CMS,
  },
};
