import User from "../../models/Signupmodel.js";
import bcrypt from "bcrypt";


const ADDuserSystemoruser = async (req, res) => {
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


        const newUser = new User({
            name,
            email,
            address,
            password: hashedPassword,
            otp: 0,
            otpExpiresAt: 0,
            role: userType,
            isVerified: true

        });
        await newUser.save();






        res.status(201).json({
            message: "Signup successful",
            user: {
                name: newUser.name,
                email: newUser.email,
                address: newUser.address,
                otp: 0,
                isVerified: true,
                otpExpiresAt: newUser.otpExpiresAt,
                role: newUser.role


            }
        });

    } catch (error) {

        res.status(400).json({ error: error.message });
    }
}
export default ADDuserSystemoruser;