import { Logger } from '@nestjs/common';
import mongoose from 'mongoose';

export default async function connectToDb() {
  const logger = new Logger(connectToDb.name);
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      logger.log('Connected to db successfully');
    })
    .catch((err) => {
      logger.error(err, '<<-- Error in connecting mongodb');
    });
}
