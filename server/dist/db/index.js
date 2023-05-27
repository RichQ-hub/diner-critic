"use strict";
/**
 * Configures pg pool module to connect to postgresql database.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
// Automatically connects to the database using the environment variables defined
// in the .env file.
const pool = new pg_1.Pool();
// We are exporting the query function from pg pool.
exports.default = {
    query: (text, params) => pool.query(text, params),
};
// Link to types: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/pg/index.d.ts
