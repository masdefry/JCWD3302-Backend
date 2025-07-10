"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_router_1 = __importDefault(require("./routers/index.router"));
const PORT = 8000;
const app = (0, express_1.default)();
// Initialize body parser (supaya express dapat menerima req.body)
app.use(express_1.default.json());
app.use(index_router_1.default);
app.get('/api', (_, res) => {
    return res.status(200).json({
        message: 'Welcome to our API',
    });
});
app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
});
