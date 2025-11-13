import React, { useState } from "react";
import axios from "axios";
import "./Verifyotp.css";
import { useNavigate } from "react-router-dom";
import AppContext from "../Createcontext.js";
import { useContext } from "react";
const Verifyotp = () => {
    const { Role, setRole } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log(Role + "role");
        e.preventDefault();
        setMessage("");

        if (!email || !otp) {
            setMessage("Both email and OTP are required.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(
                "http://localhost:3000/auth/verify-otp",
                { email, otp: Number(otp) },
                { withCredentials: true }
            );

            if (res.status === 200) {
                const userRole = res.data.user.role;
                setRole(userRole);
                localStorage.setItem("role", userRole);
                setMessage("OTP verified successfully! Redirecting...");
                setTimeout(() => navigate("/"), 1500);
            } else {
                throw new Error(res.data.error || "Verification failed");
            }
        } catch (err) {
            setMessage(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="verify-container">
            <form className="verify-form" onSubmit={handleSubmit}>
                <h2>Verify OTP</h2>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>OTP</label>
                    <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        maxLength="6"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>

                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default Verifyotp;

