
import Storemodels from "../../models/Storemodels.js";
import User from "../../models/Signupmodel.js";
const addstore = async (req, res) => {
    try {
        console.log(req.user);
        const { StoreName, StoreAddress } = req.body;
        if (!StoreName || !StoreAddress) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.role !== "Store-Owner") {
            return res.status(403).json({ error: "Only store owners can add a store" });
        }
        const existingStore = await Storemodels.findOne({ owner: user._id });
        if (existingStore) {
            return res.status(400).json({ error: "Store already exists for this user" });
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
export default addstore;