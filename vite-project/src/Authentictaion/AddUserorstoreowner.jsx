import React, { useState } from "react";
import axios from "axios";
import "./AddUserorstoreowner.css";

const AddUserorstoreowner = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        password: "",
        userType: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {


            const res = await axios.post(
                "http://localhost:3000/auth/ADDuserSystemoruser",
                formData,
                {
                    withCredentials: true
                }
            );

            setMessage(res.data.message);
            setFormData({
                name: "",
                email: "",
                address: "",
                password: "",
                userType: "",
            });
        } catch (error) {
            setMessage(error.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="adduser-container">
            <form className="adduser-form" onSubmit={handleSubmit}>
                <h2>Add User or Store Owner</h2>

                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Address</label>
                <textarea
                    name="address"
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                ></textarea>

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <label>Role</label>
                <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Role</option>
                    <option value="user">Normal User</option>
                    <option value="Store-Owner">Store Owner</option>

                </select>

                <button type="submit" disabled={loading}>
                    {loading ? "Adding User..." : "Add User"}
                </button>

                {message && <p className="adduser-message">{message}</p>}
            </form>
        </div>
    );
};

export default AddUserorstoreowner;
