import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import '../../../GlobalStyle/index.css';
function Sidebar() {
	const toggleSidebar = () => {
		const sidebar = document.querySelector(".sidebar");
		sidebar.classList.toggle("close");
	};
	
	const logoClick = () => {
		const sidebar = document.querySelector(".sidebar");
		sidebar.classList.toggle("close");
	};
  return (
    <div className="sidebar-container">
      <div className="sidebar close" onClick={toggleSidebar}>
        {/* <!-- ========== Logo ============  --> */}
        <a href="#" className="logo-box">
            <img
                src={process.env.PUBLIC_URL + '/MenuWhite.png'}
                width="64"
                height="64"
                className="d-inline-block align-top ml-1"
                alt=""
            />

            <div className="logo-name">MENU</div>
        </a>


        {/* <!-- ========== List ============  --> */}
        <ul className="sidebar-list">
            {/* <!-- -------- Non Dropdown List Item ------- --> */}
            <li>
                <div className="title">
                    <a onClick={() => onItemClick('upload')} className="link">
                        <i className='bx bx-grid-alt'></i>
                        <span className="name">Dashboard</span>
                    </a>
                    {/* <!-- <i class='bx bxs-chevron-down'></i> --> */}
                </div>
                <div className="submenu">
                    <a href="#" className="link submenu-title">Dashboard</a>
                    {/* <!-- submenu links here  --> */}
                </div>
            </li>

            {/* <!-- -------- Dropdown List Item ------- --> */}
            <li className="dropdown">
                <div className="title">
                    <a href="#" className="link">
                        <i className='bx bx-collection'></i>
                        <span className="name">Category</span>
                    </a>
                    <i className='bx bxs-chevron-down'></i>
                </div>
                <div className="submenu">
                    <a href="#" className="link submenu-title">Category</a>
                    <a href="#" className="link">HTML & CSS</a>
                    <a href="#" className="link">JavaScript</a>
                    <a href="#" className="link">PHP & MySQL</a>
                </div>
            </li>

            {/* <!-- -------- Dropdown List Item ------- --> */}
            <li className="dropdown">
                <div className="title">
                    <a href="#" className="link">
                        <i className='bx bx-book-alt'></i>
                        <span className="name">Posts</span>
                    </a>
                    {/* <i className='bx bxs-chevron-down'></i> */}
                </div>
                <div className="submenu">
                    <a href="#" className="link submenu-title">Posts</a>
                    <a href="#" className="link">Web Design</a>
                    <a href="#" className="link">Login Form</a>
                    <a href="#" className="link">Card Design</a>
                </div>
            </li>

            {/* <!-- -------- Non Dropdown List Item ------- --> */}
            <li>
                <div className="title">
                    <a href="#" className="link">
                        <i className='bx bx-line-chart'></i>
                        <span className="name">Analytics</span>
                    </a>
                    {/* <!-- <i className='bx bxs-chevron-down'></i> --> */}
                </div>
                <div className="submenu">
                    <a href="#" className="link submenu-title">Analytics</a>
                    {/* <!-- submenu links here  --> */}
                </div>
            </li>

            {/* <!-- -------- Non Dropdown List Item ------- --> */}
            <li>
                <div className="title">
                    <a href="#" className="link">
                        <i className='bx bx-pie-chart-alt-2'></i>
                        <span className="name">Chart</span>
                    </a>
                    {/* <!-- <i className='bx bxs-chevron-down'></i> --> */}
                </div>
                <div className="submenu">
                    <a href="#" className="link submenu-title">Chart</a>
                    {/* <!-- submenu links here  --> */}
                </div>
            </li>

            {/* <!-- -------- Dropdown List Item ------- --> */}
            <li className="dropdown">
                <div className="title">
                    <a href="#" className="link">
                        <i className='bx bx-extension'></i>
                        <span className="name">Plugins</span>
                    </a>
                    <i className='bx bxs-chevron-down'></i>
                </div>
                <div className="submenu">
                    <a href="#" className="link submenu-title">Plugins</a>
                    <a href="#" className="link">UI Face</a>
                    <a href="#" className="link">Pigments</a>
                    <a href="#" className="link">Box Icons</a>
                </div>
            </li>

            {/* <!-- -------- Non Dropdown List Item ------- --> */}
            <li>
                <div className="title">
                    <a href="#" className="link">
                        <i className='bx bx-compass'></i>
                        <span className="name">Explore</span>
                    </a>
                    {/* <!-- <i className='bx bxs-chevron-down'></i> --> */}
                </div>
                <div className="submenu">
                    <a href="#" className="link submenu-title">Explore</a>
                    {/* <!-- submenu links here  --> */}
                </div>
            </li>

            {/* <!-- -------- Non Dropdown List Item ------- --> */}
            <li>
                <div className="title">
                    <a href="#" className="link">
                        <i className='bx bx-history'></i>
                        <span className="name">History</span>
                    </a>
                    {/* <!-- <i className='bx bxs-chevron-down'></i> --> */}
                </div>
                <div className="submenu">
                    <a href="#" className="link submenu-title">History</a>
                    {/* <!-- submenu links here  --> */}
                </div>
            </li>

            {/* <!-- -------- Non Dropdown List Item ------- --> */}
            <li>
                <div className="title">
                    <a href="#" className="link">
                        <i className='bx bx-cog'></i>
                        <span className="name">Settings</span>
                    </a>
                    {/* <!-- <i className='bx bxs-chevron-down'></i> --> */}
                </div>
                <div className="submenu">
                    <a href="#" className="link submenu-title">Settings</a>
                    {/* <!-- submenu links here  --> */}
                </div>
            </li>
        </ul>
    </div>

    {/* <!-- ============= Home Section =============== --> */}
    {/* <section class="home bg-light">
        <div class="toggle-sidebar" onClick={logoClick}>
            <i class='bx bx-menu'></i>

        </div>
    </section> */}
    </div>
  );
}
export default Sidebar;
