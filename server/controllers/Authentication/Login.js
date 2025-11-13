//Login controllers with  email and password and also save the otp also in the genrate it and send to the sendotp user them i will verifu utils
import User from "../../models/Signupmodel.js";
import bcrypt from "bcrypt";
import sendotpuser from "../../utils/Sendotp.js";
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and Password are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid Password" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.otp = otp;
        user.isVerified = false;
        await user.save();
        await sendotpuser(user.email, otp);
        res.status(200).json({
            message: "Login successful, OTP sent to email",
            user: {
                name: user.name,
                email: user.email,
                address: user.address,
                isVerified: user.isVerified,
                otp: user.otp
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export default login;