// const util = require("util");
import util from "util"
// const Multer = require("multer");
import Multer from "multer"
// const maxSize = 2 * 1024 * 1024; we can restrict the file size as well : for ex - 2mb
let processFile = Multer({
    storage: Multer.memoryStorage()
}).single("file");

let processFileMiddleware = util.promisify(processFile);

export default processFileMiddleware