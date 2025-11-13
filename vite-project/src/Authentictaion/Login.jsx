import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
        const { email, password } = formData;

        if (!email || !password) {
            setMessage("All fields are required.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post("http://localhost:3000/auth/login", formData, { withCredentials: true });

            if (res.status === 200) {
                setMessage("Login successful! Redirecting to OTP verification...");

                setTimeout(() => navigate("/verify-otp"), 1500);
            } else {
                throw new Error(res.data.error || "Login     failed");
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
                <h2>Login</h2>



                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>



                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>



                <button type="submit" disabled={loading}>
                    {loading ? "Creating Account..." : "Signup"}
                </button>

                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default Login;
