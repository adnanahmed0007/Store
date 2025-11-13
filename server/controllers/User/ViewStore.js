//user can view store and its details
import Storemodels from "../../models/Storemodels.js";
const Viewstore = async (req, res) => {
    try {
        const getstore = await Storemodels.find();
        if (!getstore) {
            return res.status(404).json({ error: "No stores found" });
        }
        if (getstore.length === 0) {
            return res.status(404).json({ error: "No stores found" });
        }
        return res.status(200).json({
            message: "Stores retrieved successfully",
            getstore
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
export default Viewstore;