import React, { useContext } from 'react';
import axios from 'axios';
import "./Logout.css";
import AppContext from "../Createcontext.js";

const Logout = () => {
    const { setRole } = useContext(AppContext);

    async function handleLogout() {
        try {
            const response = await axios.get("http://localhost:3000/auth/logout", { withCredentials: true });
            if (response.status === 200) {

                setRole(null);
                localStorage.removeItem("role");

                console.log('Logout successful');
                alert('Successfully logged out');
                window.location.href = '/login';
            } else {
                console.error('Logout failed');
                alert('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred during logout:', error);
            alert('Error during logout');
        }
    }

    return (
        <div className="logout-container">
            <button className='btn' onClick={handleLogout}>
                <h2>Logout</h2>
            </button>
        </div>
    );
};

export default Logout;
