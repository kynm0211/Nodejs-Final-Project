import React from "react";
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginRegister from './pages/login/LoginRegister';
import ForgetPassword from "./pages/login/ForgetPassword";
function App() {
  return (
    <div className="App">
      <Router> 
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/forget" element={<ForgetPassword />} />
      </Routes>
    </Router>
    </div>

  );
}

export default App;
