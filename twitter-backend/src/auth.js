//auth.js
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (user) => {
    return jwt.sign({ email: user.email, password: user.password }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}
export const authenticateToken = (req, res, next) => {
    // Get the token from the authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) return res.sendStatus(401); // If no token is provided, unauthorized

    jwt.verify(token, 'genSecKey', (err, user) => {
        if (err) return res.sendStatus(403); // If token is not valid or expired, forbidden
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
};
