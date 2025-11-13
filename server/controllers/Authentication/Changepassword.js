 
import User from "../../models/Signupmodel.js";
import bcrypt from "bcrypt";
const changepassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        console.log(req.user)
        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Old password is incorrect" });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default changepassword;
