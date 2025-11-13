import Storemodels from "../../models/Storemodels.js";
import Rating from "../../models/Rating.js";
import User from "../../models/Signupmodel.js";
const Fetchratinguser = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: "Unauthorized: User not authenticated" });
        }

        const userId = req.user._id;

        const finduserid = await Storemodels.find({ owner: userId });
        console.log(finduserid)

        if (!finduserid || finduserid.length === 0) {
            return res.status(404).json({ error: "No stores found for this user" });
        }


        const storeIds = finduserid.map(store => store._id);
        const storename = finduserid.map(storename => storename.StoreName)

        console.log("Store IDs:", storeIds + " " + storename);

        const storesRating = await Rating.find({ store: { $in: storeIds } });

        console.log(storesRating)

        if (!storesRating || storesRating.length === 0) {
            return res.status(404).json({ error: "No ratings found for this user's stores" });
        }

        return res.status(200).json({
            message: "Ratings fetched successfully",
            ratings: storesRating,
            Storename: storename
        });
    } catch (error) {
        console.error("Error in Fetchratinguser:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default Fetchratinguser;
