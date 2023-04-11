"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ftp_1 = __importDefault(require("./routes/ftp"));
const hello_1 = __importDefault(require("./routes/hello"));
// guaranteed to get dependencies
exports.default = () => {
    const app = express_1.Router();
    ftp_1.default(app);
    hello_1.default(app);
    return app;
};
//# sourceMappingURL=index.js.map