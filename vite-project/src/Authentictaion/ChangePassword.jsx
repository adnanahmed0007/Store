
import React, { useState } from "react";
import axios from "axios";
import "./ChangePassword.css";

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        email: "",
        oldPassword: "",
        newPassword: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        const { email, oldPassword, newPassword } = formData;

        if (!email || !oldPassword || !newPassword) {
            setMessage("All fields are required.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post("http://localhost:3000/auth/change-password", formData, { withCredentials: true });

            if (res.status === 200) {
                setMessage("Password changed successfully!");
                setFormData({ email: "", oldPassword: "", newPassword: "" });
            } else {
                throw new Error(res.data.error || "Failed to change password");
            }
        } catch (err) {
            setMessage(err.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="change-password-container">
            <form className="change-password-form" onSubmit={handleSubmit}>
                <h2>Change Password</h2>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                </div>

                <div className="form-group">
                    <label>Old Password</label>
                    <input
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        placeholder="Enter old password"
                    />
                </div>

                <div className="form-group">
                    <label>New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter new password"
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Change Password"}
                </button>

                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default ChangePassword;

