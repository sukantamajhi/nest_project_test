import { Logger } from '@nestjs/common';
import mongoose from 'mongoose';

export default async function connectToDb() {
  const logger = new Logger(connectToDb.name);
  mongoose
    .connect('mongodb://localhost:27017/nest_project')
    .then(() => {
      logger.log('Connected to db successfully');
    })
    .catch((err) => {
      logger.log(err, '<<-- Error in connecting mongodb');
    });
}
