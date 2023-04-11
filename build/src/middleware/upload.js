"use strict";
// const util = require("util");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
// const Multer = require("multer");
const multer_1 = __importDefault(require("multer"));
// const maxSize = 2 * 1024 * 1024; we can restrict the file size as well : for ex - 2mb
let processFile = multer_1.default({
    storage: multer_1.default.memoryStorage()
}).single("file");
let processFileMiddleware = util_1.default.promisify(processFile);
exports.default = processFileMiddleware;
//# sourceMappingURL=upload.js.map