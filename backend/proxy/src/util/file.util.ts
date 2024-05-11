import fs from 'fs';

export class FileUtil {
  static writeBase64Image(path: string, data: string) {
    fs.writeFile(path, data, 'base64', (error) => {
      if (error) {
        console.error(error);
      }
    });
  }
}
