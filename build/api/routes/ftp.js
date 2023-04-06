"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IFTP_1 = require("../../interfaces/IFTP");
const route = express_1.Router();
exports.default = (app) => {
    app.use("/ftp", route);
    route.post("/", downloadFTPFile);
};
// Get CMS API
async function downloadFTPFile(req, res) {
    // console.log(req,'req details from ftp')
    // const fileName = req.params.filename;
    const data = req.body;
    // console.log(fileName,'filename from ftp')
    await IFTP_1.IFTP.downloadFTPFileInterface(data)
        .then((response) => {
        console.log(response, "from ftp, response check ");
        if (response) {
            console.log(response, "inside if condition response from ftp.ts");
            return res.status(200).json(response);
        }
        else {
            console.log("from ftp- swr 400 ");
            return res.status(400).json("Something went wrong from ftp");
        }
    })
        .catch((e) => {
        return res.status(500).end();
    });
}
//# sourceMappingURL=ftp.js.map