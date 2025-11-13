 
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.JWT_SECRET
const GenerateToken = async (user_id, res) => {
    const token = jwt.sign({ user_id }, secretKey, { expiresIn: '15d' });
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,

    })
    return token;
}

export default GenerateToken;
