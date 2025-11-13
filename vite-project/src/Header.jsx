import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import AppContext from "./Createcontext.js";
import { useContext } from "react";

const Header = () => {
    const { Role } = useContext(AppContext);
    return (
        <header className="header">
            <div className="header-logo">Store Rating Platform</div>
            <nav className="header-nav">
                <ul className="nav-list">
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="/login" className="nav-link">Login</Link></li>
                    <li><Link to="/signup" className="nav-link">Signup</Link></li>
                    <li><Link to="/logout" className="nav-link">Logout</Link></li>
                    <li><Link to="/change-password" className="nav-link">Change Password</Link></li>
                    <li><Link to="/infoget" className="nav-link">Information</Link></li>
                    {Role === "user" && (
                        <>
                            <li><Link to="/view-store" className="nav-link">View Stores</Link></li>
                            <li><Link to="/search-store" className="nav-link">Search Stores</Link></li>
                        </>
                    )}
                    {
                        Role === "Store-Owner" && (
                            <>
                                <li><Link to="/add-store" className="nav-link">Add Store</Link></li>
                                <li><Link to="/all-ratings" className="nav-link">All Ratings</Link></li>
                                <li><Link to="/ViewStoreonwerstore" className="nav-link">Store info</Link></li>
                            </>
                        )
                    }
                    {
                        Role === "SystemAdministration" && (
                            <>
                                <li><Link to="/addnewstorebyadmin" className="nav-link">Add Store</Link></li>
                                <li><Link to="/adduserorstorwwoner" className="nav-link">Add</Link></li>
                                <li><Link to="/getalltheuser" className="nav-link">AllUser</Link></li>
                                <li><Link to="/getalltheStore" className="nav-link">Allthestoreowner</Link></li>

                                <li><Link to="/ViewStoreonwerstore" className="nav-link">Store info</Link></li>
                                <li><Link to="/view-store" className="nav-link">View Stores</Link></li>
                                <li><Link to="/search-store" className="nav-link">Search Stores</Link></li>
                            </>
                        )
                    }
                </ul>
                {Role && <div className="user-role">Role: {Role}</div>}

            </nav>
        </header>
    );
};

export default Header;
