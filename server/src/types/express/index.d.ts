/**
 * What is this file?
 * This file index.d.ts is a global module, which allows us to extend the 
 * Request type globally through "declaration merging".
 * 
 * According to the Express source code, this is the officially endorsed 
 * way to extend the Request type.
 */

// ---------------------------------------------------------------------------------

/**
 * This is declaration merging, allowing us to extend the request type to include
 * an optional property called user. If user exists in the req, it 
 * indicates that the user is authorized to access a route.
 */
declare namespace Express {
    export interface Request {
        user?: string
    }
}

// Rescource: https://blog.logrocket.com/extend-express-request-object-typescript/#why-extend-request