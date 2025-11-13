
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Viewstore.css";

const Viewstore = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeStore, setActiveStore] = useState(null);
    const [ratingValue, setRatingValue] = useState(0);
    const [review, setReview] = useState("");

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const res = await axios.get("http://localhost:3000/auth/view-stores", {
                    withCredentials: true,
                });

                if (res.status === 200) {
                    setStores(res.data.getstore || []);
                } else {
                    setError(res.data.error || "Failed to fetch stores");
                }
            } catch (err) {
                setError(err.response?.data?.error || "Error fetching stores");
            } finally {
                setLoading(false);
            }
        };

        fetchStores();
    }, []);

    const handleRateSubmit = async (storeId) => {
        if (ratingValue < 1 || ratingValue > 5) {
            alert("Please enter a rating between 1 and 5.");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:3000/auth/rate-store",
                { storeId, rating: Number(ratingValue), review },
                { withCredentials: true }
            );

            if (res.status === 201) {
                alert("Rating submitted successfully!");
                setStores((prev) =>
                    prev.map((store) =>
                        store._id === storeId
                            ? { ...store, OverallRating: res.data.store.OverallRating }
                            : store
                    )
                );
                setActiveStore(null);
                setRatingValue(0);
                setReview("");
            }
        } catch (err) {
            alert(err.response?.data?.error || "Failed to submit rating.");
        }
    };

    if (loading) return <div className="stores-loading">Loading stores...</div>;
    if (error) return <div className="stores-error">{error}</div>;

    return (
        <div className="store-container">
            <h1 className="store-title">All Registered Stores</h1>

            <div className="store-grid">
                {stores.map((store) => (
                    <div className="store-card" key={store._id}>
                        <h2 className="store-name">{store.StoreName}</h2>
                        <p className="store-address">📍 {store.StoreAddress}</p>
                        <div className="store-rating">⭐ Overall Rating: {store.OverallRating || 0}</div>
                        <p className="store-date">
                            Created on: {new Date(store.createdAt).toLocaleDateString()}
                        </p>

                        <button
                            className="rate-btn"
                            onClick={() => setActiveStore(activeStore === store._id ? null : store._id)}
                        >
                            {activeStore === store._id ? "Cancel" : "Rate Store"}
                        </button>

                        {activeStore === store._id && (
                            <div className="rating-form">
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    placeholder="Rating (1-5)"
                                    value={ratingValue}
                                    onChange={(e) => setRatingValue(e.target.value)}
                                />
                                <textarea
                                    placeholder="Write your review (optional)"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                ></textarea>
                                <button
                                    className="submit-rating"
                                    onClick={() => handleRateSubmit(store._id)}
                                >
                                    Submit Rating
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Viewstore;
