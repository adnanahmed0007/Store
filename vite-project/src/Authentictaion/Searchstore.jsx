import React, { useState } from "react";
import axios from "axios";
import "./Searchstore.css";

const Searchstore = () => {
    const [StoreName, setStoreName] = useState("");
    const [StoreAddress, setStoreAddress] = useState("");
    const [stores, setStores] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeStore, setActiveStore] = useState(null);
    const [ratingValue, setRatingValue] = useState(0);
    const [review, setReview] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        setError("");
        setStores([]);
        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:3000/auth/searchstore",
                { StoreName, StoreAddress },
                { withCredentials: true }
            );

            if (res.status === 200) {
                setStores(res.data.findStores || []);
            } else {
                setError(res.data.message || "Failed to fetch stores");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Error fetching stores");
        } finally {
            setLoading(false);
        }
    };

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

    return (
        <div className="searchstore-container">
            <h1 className="searchstore-title">Search for a Store</h1>

            <form className="searchstore-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter Store Name"
                    value={StoreName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="searchstore-input"
                />
                <input
                    type="text"
                    placeholder="Enter Store Address"
                    value={StoreAddress}
                    onChange={(e) => setStoreAddress(e.target.value)}
                    className="searchstore-input"
                />
                <button type="submit" className="searchstore-btn">
                    🔍 Search
                </button>
            </form>

            {loading && <div className="loading-text">Searching stores...</div>}
            {error && <div className="error-text">{error}</div>}

            <div className="store-grid">
                {stores.length > 0 ? (
                    stores.map((store) => (
                        <div className="store-card" key={store._id}>
                            <h2 className="store-name">{store.StoreName}</h2>
                            <p className="store-address">📍 {store.StoreAddress}</p>
                            <div className="store-rating">⭐ Overall Rating: {store.OverallRating || 0}</div>
                            <p className="store-date">
                                Created on: {new Date(store.createdAt).toLocaleDateString()}
                            </p>

                            <button
                                className="rate-btn"
                                onClick={() =>
                                    setActiveStore(activeStore === store._id ? null : store._id)
                                }
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
                    ))
                ) : (
                    !loading &&
                    !error && <p className="no-results">No stores found</p>
                )}
            </div>
        </div>
    );
};

export default Searchstore;

