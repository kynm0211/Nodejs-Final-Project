import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import exceptedURL from "./middlewares/requiredLogin";
import LoginRegister from './pages/login/LoginRegister';
import ForgetPassword from "./pages/login/ForgetPassword";
import Upload from "./pages/upload/Upload";
import Header from "./components/Header";



function App() {
  const [user, setUser] = useState(null);
  const [path, setPath] = useState(true);
  
  
  useEffect(() => {
    const handleLogin = async () => {
      try {
        // Send a GET request to /api/session
        const res = await axios.get('/api/session');
        const data = res.data.data;

        if (data) {
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      }
    };

    handleLogin();

    // Update the path state based on the result of exceptedURL
    const newPath = exceptedURL();
    setPath(newPath);
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<Header user={user}/>} />
          <Route path="/login" element={<LoginRegister user={user}/>} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>

        {/* Checking for authorization */}
        {user === null && path === false && <Navigate from="/" to="/login" />}
      </Router>
    </div>
  );
}

export default App;
