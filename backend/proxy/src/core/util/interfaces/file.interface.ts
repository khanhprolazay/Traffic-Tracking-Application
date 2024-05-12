import { WriteFileOptions } from 'fs';

export interface WriteFileConfig {
  folder: string,
  fileName: string,
  fileType: WriteFileOptions,
  data: any,
}