import Storemodels from "../../models/Storemodels.js";
const ViweStoreOnwer = async (req, res) => {
    try {

        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: "Unauthorized: User not authenticated" });
        }

        const userId = req.user._id;


        const stores = await Storemodels.find({ owner: userId });

        if (!stores || stores.length === 0) {
            return res.status(404).json({ error: "No store found for this user" });
        }

        return res.status(200).json({
            message: "Store details fetched successfully",
            stores
        });

    }
    catch (error) {
        console.error("Error in ViewStoreOwner:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export default ViweStoreOnwer;