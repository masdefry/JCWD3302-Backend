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
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const PORT = 8000;
const app = (0, express_1.default)();
// Initialize body parser (supaya express dapat menerima req.body)
app.use(express_1.default.json());
app.get('/api', (_, res) => {
    return res.status(200).json({
        message: 'Welcome to our API',
    });
});
app.get('/api/products', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = fs_1.default.readFileSync('./src/db/db.json', 'utf-8'); // file system (membaca isi file)
    const dbParse = yield JSON.parse(db);
    return res.status(200).json({
        message: 'Get products successfull',
        products: dbParse === null || dbParse === void 0 ? void 0 : dbParse.products,
    });
}));
app.post('/api/products', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        // Step-01: Ambil req data (req.url, req.headers, req.body)
        const { name, price, stocks } = req.body;
        // Step-02.0: Read file
        const db = fs_1.default.readFileSync('./src/db/db.json', 'utf-8'); // file system (membaca isi file)
        const dbParse = yield JSON.parse(db);
        (_a = dbParse === null || dbParse === void 0 ? void 0 : dbParse.products) === null || _a === void 0 ? void 0 : _a.push({ name, price, stocks });
        //   // Step-02.1: Submit req data to db.json
        fs_1.default.writeFileSync('./src/db/db.json', JSON.stringify(dbParse));
        // Step-03: Send response
        res.status(201).json({
            message: 'Post product successfull'
        });
    });
});
app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
});
