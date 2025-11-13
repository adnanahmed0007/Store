import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GetAlltheuser.css";

const GetAlltheuser = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // assuming JWT stored
                const response = await axios.get("http://localhost:3000/auth/aluser", {
                    withCredentials: true

                });
                setUsers(response.data.Finalluser);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch users");
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="users-container">
            <h2>All Registered Users</h2>

            {error && <p className="error-message">{error}</p>}

            <div className="user-grid">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user._id} className="user-card">
                            <h3>{user.name}</h3>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Address:</strong> {user.address}</p>
                            <p><strong>Role:</strong> {user.role}</p>
                            <p className="verified">
                                {user.isVerified ? "✅ Verified" : "❌ Not Verified"}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
};

export default GetAlltheuser;

