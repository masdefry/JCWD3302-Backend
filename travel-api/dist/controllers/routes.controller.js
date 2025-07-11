"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRoutes = void 0;
const read_file_1 = require("../utils/read.file");
const findRoutes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to, time } = req.query;
        const dbRoutes = yield (0, read_file_1.readFile)('./src/db/routes.json'); // { routes: [{}, {}, {}] }
        if (!from && !to && !time) {
            // Get all routes
        }
        else {
            // Filter routes by cities and time
            const dbRoutesFilteredByCities = dbRoutes === null || dbRoutes === void 0 ? void 0 : dbRoutes.routes.filter((route) => {
                return (route === null || route === void 0 ? void 0 : route.departure_city) === from && (route === null || route === void 0 ? void 0 : route.destination_city) === to
                    ? route
                    : false;
            });
            const dbRoutesFilteredByTime = dbRoutesFilteredByCities.map((route) => {
                const schedules = route === null || route === void 0 ? void 0 : route.schedules.filter((schedule) => {
                    return (schedule === null || schedule === void 0 ? void 0 : schedule.departure_time) === time ? schedule : false;
                });
                return Object.assign(Object.assign({}, route), { schedules });
            });
            res.status(200).json({
                success: true,
                message: 'Get routes by cities and time success',
                routes: dbRoutesFilteredByTime,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.findRoutes = findRoutes;
