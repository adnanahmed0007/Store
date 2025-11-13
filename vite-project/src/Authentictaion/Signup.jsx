import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppContext from "../Createcontext.js";
import { useContext } from "react";


const Signup = () => {
    const { Role, setRole } = useContext(AppContext);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        password: "",
        userType: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        const { name, email, address, password, userType } = formData;


        if (!name || !email || !address || !password || !userType) {
            setMessage("All fields are required.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post("http://localhost:3000/auth/signup", formData, { withCredentials: true });

            if (res.status === 201) {
                setMessage("Signup successful! Redirecting to OTP verification...");
                const userRole = res.data.user.role;
                setRole(userRole);
                alert(`Signup successful! Please verify your OTP sent to your email. You are registered as ${userRole}.`);


                setTimeout(() => navigate("/verify-otp"), 1500);
            } else {
                throw new Error(res.data.error || "Signup failed");
            }
        } catch (err) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Create Account</h2>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange}></textarea>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Role</label>
                    <select name="userType" value={formData.userType} onChange={handleChange}>
                        <option value="">Select Role</option>
                        <option value="user">user</option>
                        <option value="Store-Owner">Store Owner</option>
                        <option value="SystemAdministration">SystemAdministration</option>
                    </select>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Creating Account..." : "Signup"}
                </button>

                {message && <p className="message">{message}</p>}

            </form>
        </div>
    );
};

export default Signup;


