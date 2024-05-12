import { Injectable } from '@nestjs/common';
import { promises } from 'fs';
import { WriteFileConfig } from './interfaces/file.interface';
import { LoggerService } from '../logger/logger.service';
const { writeFile, mkdir } = promises;

@Injectable()
export class FileUtil {
  constructor(private readonly logger: LoggerService) {}

  async write(config: WriteFileConfig) {
    const { folder, fileName, fileType, data } = config;
    try {
      await mkdir(folder, { recursive: true });
      await writeFile(`${folder}/${fileName}`, data, fileType);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
