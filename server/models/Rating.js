 
import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Storemodels",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "User",
        required: true
    },
    Username: {
        type: String,
        required: true

    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        maxlength: 500
    }
},
    {
        timestamps: true
    });
const Rating = mongoose.model("Rating", RatingSchema);
export default Rating;

