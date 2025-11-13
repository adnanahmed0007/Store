import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-card">
                <h1 className="home-title">Store Rating Platform</h1>
                <p className="home-description">
                    A web platform where users can rate stores, admins can manage the system,
                    and store owners can view feedback and performance.
                </p>

                <div className="home-links">
                    <Link to="/signup" className="home-btn user">
                        Signup
                    </Link>
                    <Link to="/login" className="home-btn admin">
                        Login
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Home;
