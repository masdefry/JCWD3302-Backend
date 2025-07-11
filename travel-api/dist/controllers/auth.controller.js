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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRegister = exports.authLogin = void 0;
const read_file_1 = require("./../utils/read.file");
const fs_1 = __importDefault(require("fs"));
const authLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.authLogin = authLogin;
const authRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { username, email, password } = req.body;
        const dbUsers = yield (0, read_file_1.readFile)('./src/db/users.jsonsss'); // { users: [] }
        const findUserByUsernameOrEmail = (_a = dbUsers === null || dbUsers === void 0 ? void 0 : dbUsers.users) === null || _a === void 0 ? void 0 : _a.find((user) => (user === null || user === void 0 ? void 0 : user.username) === username || (user === null || user === void 0 ? void 0 : user.email) === email);
        if (findUserByUsernameOrEmail)
            throw {
                isOperational: true,
                status: 400,
                message: 'Username or email has been used',
            };
        const uid = Date.now();
        (_b = dbUsers === null || dbUsers === void 0 ? void 0 : dbUsers.users) === null || _b === void 0 ? void 0 : _b.push({
            uid,
            username,
            email,
            password,
            role: 'USER',
        });
        fs_1.default.writeFileSync('./src/db/users.json', JSON.stringify(dbUsers));
        res.status(201).json({
            isSuccess: true,
            message: 'Register user successfull',
            uid,
        });
    }
    catch (error) {
        res.status((error === null || error === void 0 ? void 0 : error.isOperational) ? error === null || error === void 0 ? void 0 : error.status : 500).json({
            message: (error === null || error === void 0 ? void 0 : error.isOperational) ? error === null || error === void 0 ? void 0 : error.message : 'Internal server error',
        });
    }
});
exports.authRegister = authRegister;
