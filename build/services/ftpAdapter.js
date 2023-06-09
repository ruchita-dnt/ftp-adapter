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
// import {format} from 'util';
const { format } = require('util');
const storage_1 = require("@google-cloud/storage");
// Instantiate a storage client with credentials
const storage = new storage_1.Storage({ keyFilename: 'google-cloud-key.json' });
const bucketName = 'ftp_downloaded_data';
const Bucket = storage.bucket(bucketName);
// Bucket.upload(`./QAR-Sample2.txt`,
// 	{
// 		destination: `ftp_downloaded_data/QAR_data_files/image_to_upload.jpeg`,
// 	},
// 	function (err: any, file: any) {
// 		if (err) {
// 			console.error(`Error uploading image image_to_upload.jpeg: ${err}`)
// 		} else {
// 			console.log(`Image image_to_upload.jpeg uploaded to ${bucketName}.`)
// 		}
// 		file.makePublic(async function (err) {
// 			if (err) {
// 				console.error(`Error making file public: ${err}`)
// 			} else {
// 				console.log(`File ${file.name} is now public.`)
// 				const publicUrl = file.publicUrl()
// 				console.log(`Public URL for ${file.name}: ${publicUrl}`)
// 			}
// 		})
// 	})
// const bucket = storage.bucket('ftp_downloaded_data');
// const streamifier = require('streamifier');
// const {Storage} = require('@google-cloud/storage');
// const storage = new Storage();
// const bucket = storage.bucket('ftp_downloaded_data');
// const blob = bucket.file('testimg.jpg');//https://storage.cloud.google.com/ftp_downloaded_data/Screenshot%202023-03-23%20at%203.21.41%20PM.png
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
            const fileName = listAllFiles[i].name.split('.')[0];
            if (allFileExtension.includes('*') || allFileExtension.includes(extension)) {
                console.log("in if of extension");
                const destinationFolder = fileName.includes('QAR') ? 'QAR_data_files' : 'ODW_data_files';
                await this.client.downloadTo(`${destinationPath}${listAllFiles[i].name}`, `${ftpServerPath}${listAllFiles[i].name}`);
                await Bucket.upload(`${destinationPath}${listAllFiles[i].name}`, {
                    destination: `${destinationFolder}/${listAllFiles[i].name}`,
                }, function (err, file) {
                    if (err) {
                        console.error(`Error uploading file: ${err}`);
                    }
                    else {
                        console.log(`File uploaded to ${bucketName}.`);
                    }
                    console.log(file, 'This is file output');
                });
                // await this.client.rename(`${ftpServerPath}${listAllFiles[i].name}`, `${moveDirectoryPath}${listAllFiles[i].name.split('.')[0]}_processed.${extension}`);
            }
        }
    }
    async listFiles(remotePath) {
        return await this.client.list(remotePath);
    }
    async uploadFile(localFilePath, remoteFilePath) {
        await this.client.uploadFrom(localFilePath, remoteFilePath);
    }
}
exports.FtpAdapter = FtpAdapter;
//# sourceMappingURL=ftpAdapter.js.map