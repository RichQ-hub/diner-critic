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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Verifies that the incoming request has a valid token in order to check if
 * the user is "AUTHORISED" (not "AUTHENTICATED"), i.e. that the user is
 * allowed to access a specific route.
 */
function authorize(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Incoming token will be stored in the header of the request object.
            const token = req.header('token');
            // If no token was found in the header, not authorized.
            if (!token) {
                return res
                    .status(403)
                    .send({ message: 'No token found. Authorization denied.' });
            }
            // Decode the token and extract the payload.
            const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            // If the signature does not match the payload in the given token, then the 
            // token has been modified and is thus invalid.
            if (!payload.user_id) {
                return res
                    .status(403)
                    .send({ message: 'Token verification failed. Authorization denied.' });
            }
            // Add the user email into the request object to be passed onto the next function.
            req.user = payload.email;
            // Call next function since this is middleware.
            next();
        }
        catch (error) {
            res.status(500).send({ message: error });
        }
    });
}
exports.default = authorize;
/**
 * NOTES: Purpose of JWT Tokens.
 * When a user is logged in (authenticated), their client receives a jwt token.
 * The user can then send requests which carry that same jwt token to access
 * routes that they are authorised to access (e.g. when a certain API route should
 * only be available to admin users).
 *
 * Signatures:
 * While the payload and header can easily be decoded, the signature part ensures
 * that the jwt token has not been modified from the moment it was created in the
 * server. This is because the token was generated using the payload + header +
 * secret key. The secret key should be hidden in the server database so that
 * outsiders cannot use the key to generate their own JWT token.
 *
 * Security Con:
 * JWT can still be stolen by parties that can intercept http requests between
 * the client and the user, and can thus use that token without knowing the secret
 * key to make api requests to the user posing as the intended user. However, they
 * still wouldn't be able to modify the token since they don't know the secret key.
 *
 *      Soln:
 *      The way to solve this is to make tokens have an expiration date (e.g. after
 *      5 minutes). This is useful because if your token has been compromised, it
 *      will expire quickly after and that will limit the time window during which the
 *      attacker is able to use your token and perform operations on your behalf.
 *
 * How the server verifies that the token is not tampered:
 * The server extracts the token from incoming requests, and reproduces the signature
 * by taking the payload and header from the token and generating a new signature using
 * the secret key stored. This newly generated signature is then COMPARED with the
 * signature in the incoming token. If the are the same, then the token has not been
 * tampered with.
 *
 * Final note:
 * Therefore jwt is more of an encoding method rather than encrypting (keeping secret).
 * It is not a way to send sensitive information, rather it is to ensure that the
 * token has not been modified.
 *
 * Rescources:
 * - https://arielweinberger.medium.com/json-web-token-jwt-the-only-explanation-youll-ever-need-cf53f0822f50
 * - https://jwt.io/introduction
 * - https://supertokens.com/blog/what-is-jwt
 * - https://www.youtube.com/watch?v=7ozQLeFJpqs
 * - https://stackoverflow.com/questions/34259248/what-if-jwt-is-stolen (What if JWT was stolen?)
 */ 
