import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const mySecretKey = process.env.JWT_SECRET
import User from "../models/Signupmodel.js";
const verifyJwt = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;




        if (!token) {
            return res
                .status(404)
                .json({
                    message: "erroir occured no token found"
                })
        }
        const verify = jwt.verify(token, mySecretKey);
        if (!verify) {
            return res
                .status(401)
                .json({
                    message: 'token verifuvatruon failed',
                })
        }
        const finduser = await User.findById(verify.user_id);
        if (!finduser) {
            return res
                .status(404)
                .json({
                    message: "User not found"
                })
        }
        req.user = finduser;
        next();


    }
    catch (E) {
        console.log(E);
        return res
            .status(404)
            .json({
                message: `error occured ${E}`
            })
    }
}
export default verifyJwt;