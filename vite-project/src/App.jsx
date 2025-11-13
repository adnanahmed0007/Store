import React, { useState, useEffect } from 'react'
import Login from './Authentictaion/Login'
import Signup from './Authentictaion/Signup'
import Verifyotp from './Authentictaion/Verifyotp'
import Home from './Home.jsx'
import Header from './Header.jsx'
import Logout from './Authentictaion/Logout.jsx'
import ChangePassword from './Authentictaion/ChangePassword.jsx'
import AppContext from './Createcontext.js'
import Viewstore from './Authentictaion/Viewstore.jsx'
import Searchstore from './Authentictaion/Searchstore.jsx'
import Addstore from './Authentictaion/Addstore.jsx'
import Alltheratings from './Authentictaion/Alltheratings.jsx'
import ViewStoreonwer from './Authentictaion/ViewStoreonwer.jsx'
import AddstoresByadmin from './Authentictaion/AddstoresByadmin.jsx'
import AddUserorstoreowner from './Authentictaion/AddUserorstoreowner.jsx'
import GetAlltheuser from './Authentictaion/GetAlltheuser.jsx'
import Getallstore from './Authentictaion/Getallstore.jsx'
import Infoget from './Authentictaion/Infoget.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


const App = () => {
  const [Role, setRole] = useState(() => localStorage.getItem("role") || null);

  useEffect(() => {
    if (Role) {
      localStorage.setItem("role", Role);
    } else {
      localStorage.removeItem("role");
    }
  }, [Role]);

  return (
    <AppContext.Provider value={{ Role, setRole }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<Verifyotp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/view-store" element={<Viewstore />} />
          <Route path="/search-store" element={<Searchstore />} />
          <Route path="/add-store" element={<Addstore />} />
          <Route path="/all-ratings" element={<Alltheratings />} />
          <Route path="/ViewStoreonwerstore" element={<ViewStoreonwer />} />
          <Route path="/addnewstorebyadmin" element={<AddstoresByadmin />} />
          <Route path="/adduserorstorwwoner" element={<AddUserorstoreowner />} />
          <Route path="/addnewstorebyadmin" element={<AddstoresByadmin />} />
          <Route path="/getalltheuser" element={<GetAlltheuser />} />
          <Route path="/getalltheStore" element={<Getallstore />} />
          <Route path="/infoget" element={<Infoget />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}

export default App


