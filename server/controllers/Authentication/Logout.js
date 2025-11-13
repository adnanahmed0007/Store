//logout contrller expire the jwt token by clearing the cookie
import jwt from "jsonwebtoken";
const logout = async (req, res) => {
    try {
        console.log("Logout controller hit");
        res.cookie("jwt", "", {
            maxAge: "",
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        })
        return res
            .status(200)
            .json({
                message: "successfully logged out"
            })

    }
    catch (E) {
        console.log(E);
        return res.status(500).json({
            message: `error occured ${E}`
        })
    }
}
export default logout;