import User from "../../models/Signupmodel.js"
import Storemodels from "../../models/Storemodels.js";
const GetAlStore = async (req, res) => {
    try {
        const user = req.user;
        if (user.role != "SystemAdministration" && user.role != "admin") {
            return res
                .status(400)
                .json({
                    message: "only admin can access"
                })
        }
        const Finalluser = await User.find({ role: "Store-Owner" });

        const allid = await Promise.all(
            Finalluser.map(async (value) => {
                const getinf = await Storemodels.find({ owner: value._id });
                console.log(getinf)
                return getinf;
            })
        );

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
                Finalluser,
                allid
            })
    }

    catch (e) {
        console.log(e);
        res.status(400).json({ error: error.message });
    }
}
export default GetAlStore;