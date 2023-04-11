"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IFTP = void 0;
const typedi_1 = require("typedi");
const ftpCaller_1 = require("../services/ftpCaller");
class IFTP {
    // update CMS
    static async downloadFTPFileInterface(data) {
        return await new Promise(async (resolve, reject) => {
            console.log("filename in interface~~~~", data.ftpServerPath, data.destinationPath, data.moveDirectoryPath, data.fileExtension);
            const serviceFTP = await typedi_1.Container.get(ftpCaller_1.ftpCaller);
            await serviceFTP.ftpCall(data).then((res) => {
                console.log("res in IFTP", res);
                resolve({ status: 200, message: 'File downloaded successfully' });
            }).catch(err => {
                reject(err);
            });
        });
    }
}
exports.IFTP = IFTP;
//# sourceMappingURL=IFTP.js.map