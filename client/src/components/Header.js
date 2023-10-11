import React, { useState } from 'react';
import axios from 'axios';

function Header(props) {
  const user = {...props.user};
  const userUI = {
    name: user && user.name || '',
    role: user && user.role || '',
    image: user && user.image || '',
  }
  const [options, setOptions] = useState(false);

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
            <span className="badge badge-danger">{userUI.role || 'Role'}</span>
          </li>

          <li className="nav-item" onClick={toggleMenu}>
            {userUI.name || 'User'}
            <img className="p-1 mx-2" src={userUI.image} height="40" width="40" alt="User Avatar" />
            {options && (
              <ul className="navbar-nav position-absolute menu__profile">
                <li className="nav-item menu__profile-item">
                  <a href="/profile">Hồ sơ</a>
                </li>
                <li className="nav-item menu__profile-item">
                  <a href="/profile">Đổi mật khẩu</a>
                </li>
                <li className="nav-item menu__profile-item">
                  <a href="/logout">Đăng xuất</a>
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
