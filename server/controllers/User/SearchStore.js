import Storemodels from "../../models/Storemodels.js";
const Searchstore = async (req, res) => {
    try {
        const user = req.user;
        const { StoreName, StoreAddress } = req.body;
        if (!StoreName || !StoreAddress) {
            return res
                .status(403)
                .json({
                    message: "fill all the credentials"
                })
        }
        if (!user) {
            return res
                .status(404)
                .json({
                    message: "user not found"
                })
        }
        const findStores = await Storemodels.find({ $and: [{ StoreName }, { StoreAddress }] });
        if (findStores.length == 0 || !findStores) {
            return res
                .status(404)
                .json({
                    message: "we cant find the stores"
                })
        }
        return res
            .status(200)
            .json({
                message: "we find all the stores",
                findStores
            })


    }
    catch (error) {
        console.error("Searchstore Error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}
export default Searchstore;