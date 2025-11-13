import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Infoget.css";

const Infoget = () => {
    const [info, setInfo] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchInfo = async () => {
            try {

                const res = await axios.get("http://localhost:3000/auth/infoget", {
                    withCredentials: true
                });
                setInfo(res.data);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching info");
            }
        };

        fetchInfo();
    }, []);

    if (error) return <p className="error-text">{error}</p>;
    if (!info) return <p className="loading-text">Loading your info...</p>;

    const { user1, findrating, findstore } = info;

    return (
        <div className="info-container">
            <h2>Your Profile Information</h2>

            <div className="user-card">
                <h3>{user1.name}</h3>
                <p><strong>Email:</strong> {user1.email}</p>
                <p><strong>Address:</strong> {user1.address}</p>
                <p><strong>Role:</strong> {user1.role}</p>
                <p><strong>Verified:</strong> {user1.isVerified ? "Yes ✅" : "No ❌"}</p>
            </div>


            {user1.role === "user" && findrating && findrating.length > 0 && (
                <div className="rating-section">
                    <h3>Your Submitted Ratings</h3>
                    <div className="rating-grid">
                        {findrating.map((r) => (
                            <div key={r._id} className="rating-card">
                                <p><strong>Store ID:</strong> {r.store}</p>
                                <p><strong>Rating:</strong> ⭐ {r.rating}</p>
                                <p><strong>Review:</strong> {r.review}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}


            {(user1.role === "Store-Owner" || user1.role === "SystemAdministration") &&
                findstore && findstore.length > 0 && (
                    <div className="store-section">
                        <h3>Your Store Information</h3>
                        <div className="store-grid">
                            {findstore.map((store) => (
                                <div key={store._id} className="store-card">
                                    <p><strong>Store Name:</strong> {store.StoreName}</p>
                                    <p><strong>Address:</strong> {store.StoreAddress}</p>
                                    <p><strong>Overall Rating:</strong> ⭐ {store.OverallRating}</p>
                                    <p><strong>Created:</strong> {new Date(store.createdAt).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
        </div>
    );
};

export default Infoget;
