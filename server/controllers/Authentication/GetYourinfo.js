import User from "../../models/Signupmodel.js";
import Storemodels from "../../models/Storemodels.js";
import Rating from "../../models/Rating.js";
const Getyourinfo = async (req, res) => {
    try {
        const user1 = req.user;
        console.log(user1);

        if (user1.role == "user") {
            const findrating = await Rating.find({ user: user1._id })
            if (findrating > 0) {
                return res
                    .status(200)
                    .json({
                        message: "we got the user info",
                        user1,
                        findrating
                    })

            }
            else {
                return res
                    .status(200)
                    .json({
                        message: "we got the user info",
                        user1,
                        findrating
                    })
            }

        }
        else {
            const findstore = await Storemodels.find({ owner: user1._id })
            if (findstore.length > 0) {
                return res
                    .status(200)
                    .json({
                        message: "we got the user info",
                        user1,
                        findstore

                    })
            }
            else {
                return res
                    .status(200)
                    .json({
                        message: "we got the user info",
                        user1,


                    })

            }

        }

    }
    catch (e) {

    }
}
export default Getyourinfo;