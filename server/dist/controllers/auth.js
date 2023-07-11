"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtGenerator_1 = __importDefault(require("../utils/jwtGenerator"));
const db_1 = __importDefault(require("../db"));
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name_first, email, password, birth_date, gender } = req.body;
            // Check if the user exists in the database.
            const existingUser = yield db_1.default.query(`
            SELECT * 
            FROM Users
            WHERE email = $1;
        `, [email]);
            // If user already exists, return error.
            if (existingUser.rows.length !== 0) {
                return res
                    .status(401)
                    .send({ message: `User with the email ${email} already exists.` });
            }
            // The user does not exist, so we proceed to create a new user.
            // The salt pretty much determines how encrypted we want our password to be.
            const saltRounds = 10;
            const salt = yield bcrypt_1.default.genSalt(saltRounds);
            // Encrypt the password with the salt.
            const passwordHash = yield bcrypt_1.default.hash(password, salt);
            // Enter the new user into the database, storing the encrypted password.
            const resultUser = yield db_1.default.query(`
            INSERT INTO Users (name_first, email, password, gender, birth_date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, [name_first, email, passwordHash, gender, birth_date]);
            const newUser = resultUser.rows[0];
            // Generate our JWT token and return it to the user's client.
            const token = (0, jwtGenerator_1.default)(newUser.id, newUser.email);
            res.json({ token });
        }
        catch (error) {
            res.status(500).send({
                message: error
            });
        }
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            // Check if the user is registered.
            const resultUser = yield db_1.default.query(`
            SELECT *
            FROM Users
            WHERE email = $1;
        `, [email]);
            if (resultUser.rows.length === 0) {
                return res
                    .status(401)
                    .send({ message: `User with email \'${email}\' does not exist.` });
            }
            const user = resultUser.rows[0];
            // Hash the incoming password, and compare it with the hashed password
            // stored in the database.
            const validPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!validPassword) {
                return res
                    .status(401)
                    .send({ message: 'Password incorrect.' });
            }
            // Generate a new token.
            const token = (0, jwtGenerator_1.default)(user.id, user.email);
            res.json({ token });
        }
        catch (error) {
            res.status(500).send({
                message: error
            });
        }
    });
}
exports.login = login;
/**
 * Verifies a token every time a React app refreshes (due to changing state).
 */
function verifyToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // The authorize middleware function runs before this, and should
            // throw an error if the token is not valid. Hence, if we made it to this
            // function, that immediately means that the user is authorized (the
            // token is valid). So we can just return true.
            res.json(true);
        }
        catch (error) {
            res.status(500).send({
                message: error
            });
        }
    });
}
exports.verifyToken = verifyToken;
/**
 * STATUS CODES:
 * 401 - Means user is 'Unauthenticated'.
 * 403 - Means user is 'Unauthorized'.
 */ 
