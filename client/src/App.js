import React from "react";
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginRegister from './pages/login/LoginRegister';
import ForgetPassword from "./pages/login/ForgetPassword";
import Upload from "./pages/upload/Upload";
import Header from "./components/Header";
function App() {
  return (
    <div className="App">
      <Router> 
        <Header /> {/* Header hiển thị trên tất cả các trang */}
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
