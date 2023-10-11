import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from "react";
import LoginRegister from './pages/login/LoginRegister';
import ForgetPassword from "./pages/login/ForgetPassword";
import Upload from "./pages/upload/Upload";
import Header from "./components/Header";
import axios from 'axios';
function App() {
  const [user, setUser] = useState(null);

  function fetchUserData(token) {
    axios.get('/api/current_user', {
        headers: {
          'Authorization': `${token}`
        }
    })
    .then(response => {
        const userData = response.data;
        console.log('User data:', userData);
        setUser({...userData});
    })
    .catch(error => {
        console.error('Error fetching user data', error);
    });
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        fetchUserData(token);
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<Header user={user}/>} />
          <Route path="/login" element={<LoginRegister/>} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
