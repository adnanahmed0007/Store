import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Alltheratings.css";

const Alltheratings = () => {
    const [ratings, setRatings] = useState([]);
    const [storename, setStorename] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const res = await axios.get("http://localhost:3000/auth/fetchallratingbyuser", {
                    withCredentials: true,
                });

                if (res.status === 200) {
                    setRatings(res.data.ratings || []);
                    setStorename(res.data.Storename || []);
                } else {
                    setError(res.data.error || "Failed to fetch ratings");
                }
            } catch (err) {
                setError(err.response?.data?.error || "Error fetching ratings");
            } finally {
                setLoading(false);
            }
        };

        fetchRatings();
    }, []);

    if (loading) return <div className="ratings-loading">Loading ratings...</div>;
    if (error) return <div className="ratings-error">{error}</div>;

    return (
        <div className="ratings-container">
            <h1 className="ratings-title">All Ratings for Your Store</h1>

            <div className="ratings-grid">
                {ratings.map((rating, index) => (
                    <div className="rating-card" key={rating._id}>
                        {/* ✅ Store Name pulled from backend’s Storename array */}
                        <h2 className="store-name">{storename[0] || "Store"}</h2>

                        <div className="rating-stars">
                            {"⭐".repeat(rating.rating)} <span>{rating.rating}/5</span>
                        </div>

                        <p className="review-text">"{rating.review}"</p>

                        <div className="rating-footer">
                            <span className="reviewer-name">
                                By: {rating.Username || rating.user || "Anonymous"}
                            </span>
                            <span className="rating-date">
                                {new Date(rating.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Alltheratings;
