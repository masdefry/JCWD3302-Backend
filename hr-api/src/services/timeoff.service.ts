import prisma from '../db/connection';
import { TimeOff } from '../generated/prisma';
import { cloudinaryUpload } from '../utils/cloudinary';

interface ICreateRequestTimeOffServiceProps
  extends Pick<TimeOff, 'timeOffType' | 'date' | 'reason' | 'requestById'> {
  files: Express.Multer.File[];
}

export const createRequestTimeOffService = async ({
  timeOffType,
  date,
  reason,
  files,
  requestById,
}: ICreateRequestTimeOffServiceProps) => {
  return prisma.$transaction(async (tx) => {
    const createdTimeOff = await tx.timeOff.create({
      data: {
        timeOffType,
        date: new Date(date),
        reason,
        requestById,
        status: 'WAITING_FOR_APPROVAL',
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
      const { secureUrl } = await cloudinaryUpload(file?.buffer);
      return { imageUrl: secureUrl, timeOffId: createdTimeOff?.id };
    });

    const filesToCreate = await Promise.all(cloudinaryUploaded);

    await tx.timeOffEvidence.createMany({
      data: filesToCreate,
    });
  });
};
