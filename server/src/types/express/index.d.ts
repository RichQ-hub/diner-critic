
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