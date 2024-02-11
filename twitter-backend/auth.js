//auth.js
import jwt from "jsonwebtoken";

const generateToken = (user) => {
    return jwt.sign({ username: user.email, password: user.password }, 'genSecKey', {
        expiresIn: '1d'
    })
}
export default generateToken;