"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
const auth_controller_1 = require("../controllers/auth.controller");
authRouter.post('/', auth_controller_1.authLogin);
authRouter.post('/register', auth_controller_1.authRegister);
exports.default = authRouter;
