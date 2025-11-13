import Rating from "../../models/Rating.js";
import Storemodels from "../../models/Storemodels.js";

const Ratingstore = async (req, res) => {
    try {
        const { storeId, rating, review } = req.body;
        const userId = req.user._id;

        const name1 = req.user.name;
        console.log(name1)


        if (!storeId || !rating) {
            return res.status(400).json({ error: "Store ID and rating are required" });
        }
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Rating must be between 1 and 5" });
        }

        const store = await Storemodels.findById(storeId);
        if (!store) {
            return res.status(404).json({ error: "Store not found" });
        }


        if (isNaN(store.OverallRating)) {
            store.OverallRating = 0;
        }

        let existingRating = await Rating.findOne({ user: userId, store: storeId });

        if (existingRating) {

            const diff = rating - existingRating.rating;
            existingRating.rating = rating;
            existingRating.review = review || existingRating.review;
            await existingRating.save();

            store.OverallRating += diff;
        } else {

            const newRating = new Rating({
                store: storeId,
                Username: name1,
                user: userId,
                rating,
                review: review || ""
            });
            await newRating.save();

            store.OverallRating += rating;
        }

        await store.save();

        res.status(201).json({
            message: "Rating and review submitted successfully",
            store: {
                StoreName: store.StoreName,
                StoreAddress: store.StoreAddress,
                OverallRating: store.OverallRating
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default Ratingstore;
