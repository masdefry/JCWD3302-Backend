"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_controller_1 = require("../controllers/routes.controller");
const routesRouter = (0, express_1.Router)();
routesRouter.get('/', routes_controller_1.findRoutes);
exports.default = routesRouter;
