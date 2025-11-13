import User from "../../models/Signupmodel.js"
const GetAluser = async (req, res) => {
    try {
        const user = req.user;
        if (user.role != "SystemAdministration" && user.role != "admin") {
            return res
                .status(400)
                .json({
                    message: "only admin can access"
                })
        }
        const Finalluser = await User.find({ role: "user" });
        if (Finalluser.length == 0 || !Finalluser) {
            return res
                .status(404)
                .json({
                    message: "not found"
                })
        }
        return res
            .status(200)
            .json({
                message: " got all the user",
                Finalluser
            })
    }

    catch (e) {
        console.log(e);
        res.status(400).json({ error: error.message });
    }
}
export default GetAluser;