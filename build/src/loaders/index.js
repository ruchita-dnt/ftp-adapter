"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const express_1 = __importDefault(require("./express"));
exports.default = async ({ expressApp }) => {
    // Load dependencies
    console.log('✌️ Dependency injector loaded');
    console.log('✌️ Express loaded');
    await express_1.default({ app: expressApp });
};
//# sourceMappingURL=index.js.map