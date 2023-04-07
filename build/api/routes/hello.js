"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
exports.default = (app) => {
    app.use("/", route);
    route.get("/", helloFromServer);
};
// Get CMS API
async function helloFromServer(req, res) {
    const respose = {
        "status": 200,
        "message": "Hello From Server"
    };
    return res.status(200).json(respose);
}
//# sourceMappingURL=hello.js.map