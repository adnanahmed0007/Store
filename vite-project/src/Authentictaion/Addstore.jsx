import React, { useState, useContext } from "react";
import axios from "axios";
import "./Addstore.css";
import AppContext from "../Createcontext.js";
import { useNavigate } from "react-router-dom";

const Addstore = () => {
    const { Role } = useContext(AppContext);
    const [storeData, setStoreData] = useState({
        StoreName: "",
        StoreAddress: ""
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setStoreData({ ...storeData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!storeData.StoreName || !storeData.StoreAddress) {
            setMessage("All fields are required.");
            return;
        }

        if (Role !== "Store-Owner") {
            setMessage("Access denied. Only store owners can add a store.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(
                "http://localhost:3000/auth/add-store",
                storeData,
                { withCredentials: true }
            );

            if (res.status === 201) {
                setMessage("Store added successfully!");
                setTimeout(() => navigate("/"), 1500);
            } else {
                throw new Error(res.data.error || "Store creation failed");
            }
        } catch (err) {
            setMessage(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="addstore-container">
            <form className="addstore-form" onSubmit={handleSubmit}>
                <h2>Add Your Store</h2>

                <div className="form-group">
                    <label>Store Name</label>
                    <input
                        type="text"
                        name="StoreName"
                        value={storeData.StoreName}
                        onChange={handleChange}
                        placeholder="Enter your store name"
                    />
                </div>

                <div className="form-group">
                    <label>Store Address</label>
                    <textarea
                        name="StoreAddress"
                        value={storeData.StoreAddress}
                        onChange={handleChange}
                        placeholder="Enter full store address"
                    ></textarea>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Adding Store..." : "Add Store"}
                </button>

                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default Addstore;
