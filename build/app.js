"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const config_1 = __importDefault(require("./config"));
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
// import * as path from 'path';
async function startServer() {
    const app = express_1.default();
    /**
     * A little hack here
     * Import/Export can only be used in 'top-level code'
     * Well, at least in node 10 without babel and at the time of writing
     * So we are using good old require.
     **/
    await require('./loaders').default({ expressApp: app });
    // app.use(express.static(path.join(__dirname, 'public')));
    app.listen(config_1.default.port, err => {
        if (err) {
            console.log(err);
            process.exit(1);
            return;
        }
        console.log(`
      ################################################
      🛡️  Server listening on port: ${config_1.default.port}   🛡️
      ################################################
    `);
    });
}
startServer();
//# sourceMappingURL=app.js.map