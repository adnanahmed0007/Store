import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewStoreonwer.css";

const ViewStoreonwer = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStoreDetails = async () => {
            try {
                const response = await axios.get("http://localhost:3000/auth/ownerviewstote", {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    setStores(response.data.stores);
                } else {
                    setError(response.data.error || "Failed to fetch store details");
                }
            } catch (err) {
                setError(err.response?.data?.error || "Error fetching store details");
            } finally {
                setLoading(false);
            }
        };

        fetchStoreDetails();
    }, []);

    if (loading) {
        return <div className="store-loading">Loading store details...</div>;
    }

    if (error) {
        return <div className="store-error">{error}</div>;
    }

    return (
        <div className="store-owner-container">
            <h1 className="store-owner-title">Your Store Details</h1>
            <div className="store-list">
                {stores.map((store) => (
                    <div className="store-card" key={store._id}>
                        <h2 className="store-name">{store.StoreName}</h2>
                        <p><strong>Address:</strong> {store.StoreAddress}</p>
                        <p><strong>Overall Rating:</strong> {store.OverallRating}</p>
                        <p><strong>Store ID:</strong> {store._id}</p>
                        <p><strong>Created:</strong> {new Date(store.createdAt).toLocaleString()}</p>
                        <p><strong>Updated:</strong> {new Date(store.updatedAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewStoreonwer;
