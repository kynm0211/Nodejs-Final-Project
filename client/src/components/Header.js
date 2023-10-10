import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Header() {
  const [user, setUser] = useState({
    name: '',
    image: '',
    role: '',
  });
  const [options, setOptions] = useState(false);

  useEffect(() => {
    // Gửi yêu cầu GET đến /api/session
    axios
      .get('/api/session')
      .then((response) => {
        let data = response.data.data;
        setUser({
          name: data.name,
          image: data.image,
          role: data.role,
        });
      })
      .catch((error) => {
        // Xử lý lỗi (nếu có)
        console.error('Error fetching session data:', error);
      });
  }, []); // Empty dependency array to run the effect once

  const toggleMenu = () => {
    setOptions(!options);
  };

  return (
    <nav className="navbar navbar-light bg-light justify-content-between">
      <a className="navbar-brand d-flex align-items-center">
        <img
          src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
          width="64"
          height="64"
          className="d-inline-block align-top"
          alt=""
        />
        <h3 className="ml-1">NodeJS-POS</h3>
      </a>
      <div className="custom-nav" id="navbarNav">
        <ul className="navbar-nav navbar-nav-inline">
          <li className="nav-item active">
            <span className="badge badge-danger">{user.role || 'Role'}</span>
          </li>

          <li className="nav-item" onClick={toggleMenu}>
            {user.name || 'User'}
            <img className="p-1 mx-2" src={user.image} height="40" width="40" alt="User Avatar" />
            {options && (
              <ul className="navbar-nav position-absolute menu__profile">
                <li className="nav-item menu__profile-item">
                  <a href="/profile">Hồ sơ</a>
                </li>
                <li className="nav-item menu__profile-item">
                  <a href="/profile">Đổi mật khẩu</a>
                </li>
                <li className="nav-item menu__profile-item">
                  <a href="/api/logout">Đăng xuất</a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
