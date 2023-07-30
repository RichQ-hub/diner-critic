"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fileStorageEngine = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // We store uploaded files in the public folder.
        cb(null, "../imgStorage");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: fileStorageEngine });
exports.default = upload;
/**
 * REFERENCES:
 * - https://www.youtube.com/watch?v=EVOFt8Its6I
 * - https://www.youtube.com/watch?v=wIOpe8S2Mk8
 */ 
