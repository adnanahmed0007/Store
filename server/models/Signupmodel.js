import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],

        maxlength: [60, "Name cannot exceed 60 characters"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email address"
        ]
    },

    address: {
        type: String,
        required: [true, "Address is required"],
        maxlength: [400, "Address cannot exceed 400 characters"],
        trim: true
    },

    password: {
        type: String,
        required: [true, "Password is required"],


    },
    otp:
    {
        type: Number,
        required: [true, "OTP is required"]
    }
    ,
    isVerified:
    {
        type: Boolean,
        default: false
    },
    role:
    {
        type: String,
        enum: ["user", "Store-Owner", "SystemAdministration"],
        default: "user"
    },
    otpExpiresAt: { type: Date },

});

const User = mongoose.model("User", userSchema);

export default User;
