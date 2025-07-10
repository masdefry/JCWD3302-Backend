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
exports.updateProductController = exports.createProductController = exports.findProductsController = void 0;
const fs_1 = __importDefault(require("fs"));
const read_file_1 = require("../utils/read.file");
const findProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = fs_1.default.readFileSync('./src/db/db.json', 'utf-8'); // file system (membaca isi file)
    const dbParse = yield JSON.parse(db);
    return res.status(200).json({
        message: 'Get products successfull',
        products: dbParse === null || dbParse === void 0 ? void 0 : dbParse.products,
    });
});
exports.findProductsController = findProductsController;
const createProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        message: 'Post product successfull',
    });
});
exports.createProductController = createProductController;
const updateProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        // Step-01 Ambil req.data
        const { name, price, stocks } = req.body;
        const { productId } = req.params;
        // Step-02 Read file db.json
        const dbParse = yield (0, read_file_1.readFile)('./src/db/db.json');
        // Step-03 Manipulasi data
        const findIndexOfProduct = (_a = dbParse === null || dbParse === void 0 ? void 0 : dbParse.products) === null || _a === void 0 ? void 0 : _a.findIndex((product) => {
            return (product === null || product === void 0 ? void 0 : product.id) == productId;
        });
        if (findIndexOfProduct === -1)
            throw new Error(`Product with id = ${productId} not found`);
        (_b = dbParse === null || dbParse === void 0 ? void 0 : dbParse.products) === null || _b === void 0 ? void 0 : _b.splice(findIndexOfProduct, 1, {
            id: (_c = dbParse === null || dbParse === void 0 ? void 0 : dbParse.products[findIndexOfProduct]) === null || _c === void 0 ? void 0 : _c.id,
            name,
            price,
            stocks,
        });
        fs_1.default.writeFileSync('./src/db/db.json', JSON.stringify(dbParse));
        // Step-04 Send response
        res.status(201).json({
            isSuccess: true,
            message: `Update product with id = ${productId} successfull`,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error === null || error === void 0 ? void 0 : error.message
        });
    }
});
exports.updateProductController = updateProductController;
req.headers['authorization'];
