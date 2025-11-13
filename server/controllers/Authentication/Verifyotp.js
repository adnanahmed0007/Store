//verfiy the otp also genrate the token also take email and otp from req body

import User from "../../models/Signupmodel.js";
import GenerateToken from "../../utils/Generatetokes.js";

const verifyotp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        console.log(req.body + " from verify otp");
        console.log(email, otp + "knkn");
        if (!email || !otp) {
            return res.status(400).json({ error: "Email and OTP are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.otp || !user.otpExpiresAt) {
            return res.status(400).json({ error: "OTP not generated or expired" });
        }
        console.log(user.otp);

        if (user.otp !== otp) {
            return res.status(400).json({ error: "Invalid OTP" });

        }
        user.isVerified = true;
        await user.save();
        const token = await GenerateToken(user._id, res);
        console.log(token + "token");

        res.status(200).json({
            message: "OTP verified successfully",
            token: token,
            user: {
                name: user.name,
                email: user.email,
                address: user.address,
                isVerified: user.isVerified,
                role: user.role
            }
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}
export default verifyotp;