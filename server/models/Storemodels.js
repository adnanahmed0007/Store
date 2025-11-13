 
import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
    StoreName: {
        type: String,
        required: true,
        trim: true
    },
    StoreAddress: {
        type: String,
        required: true,
        trim: true
    },
    OverallRating: {
        type: Number,
        default: 0

    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
    {
        timestamps: true
    });
const Storemodels = mongoose.model("Storemodels", StoreSchema);

export default Storemodels;
