import React from "react";
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginRegister from './pages/login/LoginRegister';
import ForgetPassword from "./pages/login/ForgetPassword";
import Upload from "./pages/upload/Upload";
function App() {
  return (
    <div className="App">
    <Router> 
      <Routes>
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
    </div>

  );
}

export default App;
