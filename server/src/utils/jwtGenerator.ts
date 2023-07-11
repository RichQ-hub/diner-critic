import jwt from 'jsonwebtoken';

// Somehow, this file knows the location of the .env file.

export default function generateToken(user_id: string, email: string) {
    const payload = {
        user_id,
        email,
    }

    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "600s"
    });
}