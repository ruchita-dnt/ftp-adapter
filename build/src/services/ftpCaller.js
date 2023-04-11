"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ftpCaller = void 0;
// import ejs from 'ejs';
// import path from 'path';
const typedi_1 = require("typedi");
const ftpAdapter_1 = require("./ftpAdapter");
let ftpCaller = class ftpCaller {
    constructor() {
        this.ftpAdapter = new ftpAdapter_1.FtpAdapter();
    }
    // ftp adapter
    async ftpCall(data) {
        await this.ftpAdapter.connect();
        return new Promise(async (resolve, reject) => {
            await this.ftpAdapter.downloadFile(data.ftpServerPath, data.destinationPath, data.moveDirectoryPath, data.fileExtension).then(() => {
                resolve(true);
            }).catch(err => {
                reject(err);
            });
        });
        // await this.ftpAdapter.uploadFile('/local/file/path.txt', '/remote/file/path.txt');
        // const files = await this.ftpAdapter.listFiles('/remote/directory/path');
        // console.log(files);
        // await this.ftpAdapter.disconnect();
    }
};
ftpCaller = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], ftpCaller);
exports.ftpCaller = ftpCaller;
//# sourceMappingURL=ftpCaller.js.map