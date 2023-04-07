"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FtpAdapter = void 0;
/* eslint-disable no-console */
const ftp = __importStar(require("basic-ftp"));
const config_1 = __importDefault(require("../config"));
class FtpAdapter {
    constructor() {
        this.client = new ftp.Client();
        this.client.ftp.verbose = true; // Enable verbose logging
    }
    async connect() {
        await this.client.access(config_1.default.ftpConfig);
    }
    async disconnect() {
        await this.client.close();
    }
    async downloadFile(ftpServerPath, destinationPath, moveDirectoryPath, fileExtension) {
        console.log("in download file adapter", ftpServerPath, destinationPath, moveDirectoryPath, fileExtension);
        // const res = await this.client.downloadTo(localFilePath, remoteFilePath);
        // const rename = await this.client.rename(remoteFilePath, newPath);
        //list all files in directory, download from that directory and store it into destination directory
        const listAllFiles = await this.client.list(ftpServerPath);
        const allFileExtension = fileExtension.split(',');
        console.log("allFileExtension", allFileExtension);
        for (let i = 0; i < listAllFiles.length; i++) {
            console.log("file object", listAllFiles[i].name);
            const extension = listAllFiles[i].name.split('.')[1];
            if (allFileExtension.includes('*') || allFileExtension.includes(extension)) {
                console.log("in if of extension");
                await this.client.downloadTo(`${destinationPath}${listAllFiles[i].name}`, `${ftpServerPath}${listAllFiles[i].name}`);
                // await this.client.rename(`${ftpServerPath}${listAllFiles[i].name}`, `${moveDirectoryPath}${listAllFiles[i].name.split('.')[0]}_processed.${extension}`);
            }
        }
    }
    async uploadFile(localFilePath, remoteFilePath) {
        await this.client.uploadFrom(localFilePath, remoteFilePath);
    }
    async listFiles(remotePath) {
        return await this.client.list(remotePath);
    }
}
exports.FtpAdapter = FtpAdapter;
//# sourceMappingURL=ftpAdapter.js.map