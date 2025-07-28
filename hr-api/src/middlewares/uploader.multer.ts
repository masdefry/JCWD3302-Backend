import multer, { FileFilterCallback, Multer } from 'multer';
import { Request } from 'express';
import path from 'path';
import { APIError } from '../utils/api.error';

export const uploaderMulter = (
  acceptedFiles: string[],
  diskStorage: string
) => {
  const storage =
    diskStorage === 'disk'
      ? multer.diskStorage({
          destination: function (
            req: Request,
            file: Express.Multer.File,
            cb: (error: Error | null, destination: string) => void
          ) {
            const mainDirectory = path.join(process.cwd());
            cb(null, `${mainDirectory}/src/assets`);
          },
          filename: function (
            req: Request,
            file: Express.Multer.File,
            cb: (error: Error | null, destination: string) => void
          ) {
            console.log(file);
            const extensionFile =
              file?.originalname?.split('.')[
                file?.originalname?.split('.').length - 1
              ];
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + '-' + uniqueSuffix + `.${extensionFile}`);
          },
        })
      : multer.memoryStorage();

  function fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) {
    console.log(file);
    const mimeType = file?.mimetype?.split('/')[0];
    const extensionFile =
      file?.originalname?.split('.')[file?.originalname?.split('.').length - 1];
    if (!acceptedFiles.includes(mimeType))
      cb(
        APIError(
          `Format file ${extensionFile} not accepted on file ${file?.originalname}`,
          415
        )
      );

    cb(null, true);
  }

  return multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2000000 },
  });
};
