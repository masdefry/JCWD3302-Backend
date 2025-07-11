"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./auth.router"));
const routes_router_1 = __importDefault(require("./routes.router"));
const mainRouter = (0, express_1.Router)();
mainRouter.use('/api/auth', auth_router_1.default);
mainRouter.use('/api/routes', routes_router_1.default);
exports.default = mainRouter;
