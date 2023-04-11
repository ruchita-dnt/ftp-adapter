"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
if (!dotenv_1.default) {
    throw new Error('Unable to use dot env lib');
}
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv_1.default.config();
if (!envFound) {
    // This error should crash whole process
    throw new Error("⚠️ Couldn't find .env file ⚠️");
}
exports.default = {
    /**
     * Prod or development server
     */
    ENV: 'DEV',
    // NAME: process.env.NAME,
    // VERSION: process.env.VERSION,
    /**
     * Your favorite port
     */
    port: 3000,
    // api_url: '0.0.0.0',
    // server_url: process.env.SERVER_URL,
    // admin_url: process.env.ADMIN_URL,
    // Public path
    // public_path: process.env.PUBLIC_PATH,
    /**
     * API configs
     */
    api: {
        prefix: '/',
    },
    // ftpConfig: {
    // 	host: '192.168.1.43',
    // 	port: 21,
    // 	user: 'FTP_user',
    // 	password: 'hint',
    // 	secure: false, // Set to true if using FTPS
    // 	method: "POST"
    // }
    ftpConfig: {
        host: 'demo.wftpserver.com',
        port: 21,
        user: 'demo',
        password: 'demo',
        secure: false, // Set to true if using FTPS
    }
};
//# sourceMappingURL=index.js.map