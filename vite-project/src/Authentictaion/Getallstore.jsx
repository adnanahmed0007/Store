import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Getallstore.css";

const Getallstore = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStores = async () => {
            try {

                const res = await axios.get("http://localhost:3000/auth/getallstore", {
                    withCredentials: true
                });

                // Combine user + store data into a single array
                const combined = res.data.Finalluser.map((user, i) => ({
                    ...user,
                    stores: res.data.allid[i],
                }));

                setData(combined);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch store data");
            }
        };

        fetchStores();
    }, []);

    return (
        <div className="store-container">
            <h2>All Store Owners & Their Stores</h2>

            {error && <p className="error-text">{error}</p>}

            <div className="card-grid">
                {data.length > 0 ? (
                    data.map((owner) => (
                        <div key={owner._id} className="store-card">
                            <h3>{owner.name}</h3>
                            <p><strong>Email:</strong> {owner.email}</p>
                            <p><strong>Address:</strong> {owner.address}</p>
                            <p><strong>Role:</strong> {owner.role}</p>

                            {owner.stores && owner.stores.length > 0 ? (
                                <div className="store-list">
                                    <h4>Store Details:</h4>
                                    {owner.stores.map((store) => (
                                        <div key={store._id} className="single-store">
                                            <p><strong>Name:</strong> {store.StoreName}</p>
                                            <p><strong>Address:</strong> {store.StoreAddress}</p>
                                            <p><strong>Rating:</strong> {store.OverallRating}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-store">No store added yet</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No store owners found.</p>
                )}
            </div>
        </div>
    );
};

export default Getallstore;
