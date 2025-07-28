import prisma from '../db/connection';
import { TimeOff } from '../generated/prisma';
import { cloudinaryUpload } from '../utils/cloudinary';

interface ICreateRequestTimeOffServiceProps
  extends Pick<TimeOff, 'timeOffType' | 'date' | 'reason'> {
  files: Express.Multer.File[];
}

export const createRequestTimeOffService = async ({
  timeOffType,
  date,
  reason,
  files,
}: ICreateRequestTimeOffServiceProps) => {
  return prisma.$transaction(async (tx) => {
    const createdTimeOff = await tx.timeOff.create({
      data: {
        timeOffType,
        date: new Date(date),
        reason,
      },
    });

    /*
      📃This code used for `diskStorage` on API Server

      const filesToCreate = files?.map((file) => {
        return { imageUrl: file?.filename, timeOffId: createdTimeOff?.id };
      });

      await tx.timeOffEvidence.createMany({
        data: filesToCreate,
      });
    */

    const cloudinaryUploaded = files?.map(async (file) => {
      const res: any = await cloudinaryUpload(file?.buffer);
      return { imageUrl: res?.res, timeOffId: createdTimeOff?.id };
    });

    const filesToCreate = await Promise.all(cloudinaryUploaded);

    await tx.timeOffEvidence.createMany({
      data: filesToCreate,
    });
  });
};
