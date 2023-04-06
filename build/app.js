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
/* eslint-disable no-console */
const config_1 = __importDefault(require("./config"));
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const path = __importStar(require("path"));
async function startServer() {
    const app = express_1.default();
    /**
     * A little hack here
     * Import/Export can only be used in 'top-level code'
     * Well, at least in node 10 without babel and at the time of writing
     * So we are using good old require.
     **/
    await require('./loaders').default({ expressApp: app });
    app.use(express_1.default.static(path.join(__dirname, 'public')));
    app.listen(config_1.default.port, config_1.default.api_url, err => {
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