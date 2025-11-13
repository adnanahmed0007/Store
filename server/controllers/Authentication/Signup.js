import User from "../../models/Signupmodel.js";
import bcrypt from "bcrypt";

import sendotpuser from "../../utils/Sendotp.js";
const signup = async (req, res) => {
    try {
        const { name, email, address, password, userType } = req.body;
        console.log(req.body);


        if (!name || !email || !address || !password || !userType) {
            return res.status(400).json({ error: "All fields are required" });
        }
        console.log(req.body);


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
        const newUser = new User({
            name,
            email,
            address,
            password: hashedPassword,
            otp,
            otpExpiresAt,
            role: userType
        });
        await newUser.save();

        await sendotpuser(newUser.email, otp);





        res.status(201).json({
            message: "Signup successful",
            user: {
                name: newUser.name,
                email: newUser.email,
                address: newUser.address,
                otp: newUser.otp,
                isVerified: false,
                otpExpiresAt: newUser.otpExpiresAt,
                role: newUser.role


            }
        });

    } catch (error) {

        res.status(400).json({ error: error.message });
    }
}
export default signup;