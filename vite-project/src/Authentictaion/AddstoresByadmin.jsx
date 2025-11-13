import React, { useState } from "react";
import axios from "axios";
import "./AddstoresByadmin.css";
import { useNavigate } from "react-router-dom";
const AddstoresByadmin = () => {
  const [StoreName, setStoreName] = useState("");
  const [StoreAddress, setStoreAddress] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleAddStore = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/adduserasystem", { StoreAddress, StoreName },
        { withCredentials: true }
      );


      if (response.status === 201) {
        alert("Store add successfully")
        setMessage("Store added successfully!");

        setMessage("✅ Store added successfully!");
        setStoreName("");
        setStoreAddress("");
        setTimeout(() => navigate("/"), 1500);
      } else {
        throw new Error(response.data.error || "Store creation failed");
      }


    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addstore-container">
      <div className="addstore-card">
        <h2>Add a New Store</h2>
        <form onSubmit={handleAddStore}>
          <label>Store Name</label>
          <input
            type="text"
            placeholder="Enter store name"
            value={StoreName}
            onChange={(e) => setStoreName(e.target.value)}
          />

          <label>Store Address</label>
          <input
            type="text"
            placeholder="Enter store address"
            value={StoreAddress}
            onChange={(e) => setStoreAddress(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Store"}
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default AddstoresByadmin;

