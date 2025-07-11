import { Request, Response } from 'express';
import { readFile } from '../utils/read.file';

export const findRoutes = async (req: Request, res: Response) => {
  try {
    const { from, to, time } = req.query;

    const dbRoutes = await readFile('./src/db/routes.json'); // { routes: [{}, {}, {}] }

    if (!from && !to && !time) {
      // Get all routes
    } else {
      // Filter routes by cities and time
      const dbRoutesFilteredByCities = dbRoutes?.routes.filter((route) => {
        return route?.departure_city === from && route?.destination_city === to
          ? route
          : false;
      });

      const dbRoutesFilteredByTime = dbRoutesFilteredByCities.map((route) => {
        const schedules = route?.schedules.filter((schedule) => {
          return schedule?.departure_time === time ? schedule : false;
        });

        return { ...route, schedules };
      });

      res.status(200).json({
        success: true,
        message: 'Get routes by cities and time success',
        routes: dbRoutesFilteredByTime,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
