import Storemodels from "../../models/Storemodels.js";
import User from "../../models/Signupmodel.js";
const ADDuserSystemStore = async (req, res) => {
    try {
        console.log("hello")

        const { StoreName, StoreAddress } = req.body;
        if (!StoreName || !StoreAddress) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }



        const newStore = new Storemodels({
            StoreName,
            StoreAddress,
            StoreContact: user.phone || "Not Provided",
            owner: user._id
        });
        await newStore.save();
        res.status(201).json({
            message: "Store added successfully",
            store: {
                StoreName: newStore.StoreName,
                StoreAddress: newStore.StoreAddress,
                owner: newStore.owner
            }
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export default ADDuserSystemStore;