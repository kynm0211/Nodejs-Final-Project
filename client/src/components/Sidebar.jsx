import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import '../assets/css/sidebar.css';
import Header from './Header';
function Sidebar({user}) {

	const [activeItem, setActiveItem] = useState(null);
	const listItems = document.querySelectorAll(".sidebar-list li");

	listItems.forEach((item) => {
		item.addEventListener("click", () => {
			setActiveItem(item);
		});
	});
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
				src="https://cdn-icons-png.flaticon.com/512/919/919825.png"
				width="64"
				height="64"
				className="d-inline-block align-top"
				alt=""
			/>

			<div className="logo-name">NodeJS</div>
		</a>

        {/* <!-- ========== List ============  --> */}
        <ul class="sidebar-list">
            {/* <!-- -------- Non Dropdown List Item ------- --> */}
            <li>
                <div class="title">
                    <a href="#" class="link">
                        <i class='bx bx-grid-alt'></i>
                        <span class="name">Dashboard</span>
                    </a>
                    {/* <!-- <i class='bx bxs-chevron-down'></i> --> */}
                </div>
                <div class="submenu">
                    <a href="#" class="link submenu-title">Dashboard</a>
                    {/* <!-- submenu links here  --> */}
                </div>
            </li>

            {/* <!-- -------- Dropdown List Item ------- --> */}
            <li class="dropdown">
                <div class="title">
                    <a href="#" class="link">
                        <i class='bx bx-collection'></i>
                        <span class="name">Category</span>
                    </a>
                    <i class='bx bxs-chevron-down'></i>
                </div>
                <div class="submenu">
                    <a href="#" class="link submenu-title">Category</a>
                    <a href="#" class="link">HTML & CSS</a>
                    <a href="#" class="link">JavaScript</a>
                    <a href="#" class="link">PHP & MySQL</a>
                </div>
            </li>

            {/* <!-- -------- Dropdown List Item ------- --> */}
            <li class="dropdown">
                <div class="title">
                    <a href="#" class="link">
                        <i class='bx bx-book-alt'></i>
                        <span class="name">Posts</span>
                    </a>
                    {/* <i class='bx bxs-chevron-down'></i> */}
                </div>
                <div class="submenu">
                    <a href="#" class="link submenu-title">Posts</a>
                    <a href="#" class="link">Web Design</a>
                    <a href="#" class="link">Login Form</a>
                    <a href="#" class="link">Card Design</a>
                </div>
            </li>

            {/* <!-- -------- Non Dropdown List Item ------- --> */}
            <li>
                <div class="title">
                    <a href="#" class="link">
                        <i class='bx bx-line-chart'></i>
                        <span class="name">Analytics</span>
                    </a>
                    {/* <!-- <i class='bx bxs-chevron-down'></i> --> */}
                </div>
                <div class="submenu">
                    <a href="#" class="link submenu-title">Analytics</a>
                    {/* <!-- submenu links here  --> */}
                </div>
            </li>

            {/* <!-- -------- Non Dropdown List Item ------- --> */}
            <li>
                <div class="title">
                    <a href="#" class="link">
                        <i class='bx bx-pie-chart-alt-2'></i>
                        <span class="name">Chart</span>
                    </a>
                    {/* <!-- <i class='bx bxs-chevron-down'></i> --> */}
                </div>
                <div class="submenu">
                    <a href="#" class="link submenu-title">Chart</a>
                    {/* <!-- submenu links here  --> */}
                </div>
            </li>

            {/* <!-- -------- Dropdown List Item ------- --> */}
            <li class="dropdown">
                <div class="title">
                    <a href="#" class="link">
                        <i class='bx bx-extension'></i>
                        <span class="name">Plugins</span>
                    </a>
                    <i class='bx bxs-chevron-down'></i>
                </div>
                <div class="submenu">
                    <a href="#" class="link submenu-title">Plugins</a>
                    <a href="#" class="link">UI Face</a>
                    <a href="#" class="link">Pigments</a>
                    <a href="#" class="link">Box Icons</a>
                </div>
            </li>

            {/* <!-- -------- Non Dropdown List Item ------- --> */}
            <li>
                <div class="title">
                    <a href="#" class="link">
                        <i class='bx bx-compass'></i>
                        <span class="name">Explore</span>
                    </a>
                    {/* <!-- <i class='bx bxs-chevron-down'></i> --> */}
                </div>
                <div class="submenu">
                    <a href="#" class="link submenu-title">Explore</a>
                    {/* <!-- submenu links here  --> */}
                </div>
            </li>

            {/* <!-- -------- Non Dropdown List Item ------- --> */}
            <li>
                <div class="title">
                    <a href="#" class="link">
                        <i class='bx bx-history'></i>
                        <span class="name">History</span>
                    </a>
                    {/* <!-- <i class='bx bxs-chevron-down'></i> --> */}
                </div>
                <div class="submenu">
                    <a href="#" class="link submenu-title">History</a>
                    {/* <!-- submenu links here  --> */}
                </div>
            </li>

            {/* <!-- -------- Non Dropdown List Item ------- --> */}
            <li>
                <div class="title">
                    <a href="#" class="link">
                        <i class='bx bx-cog'></i>
                        <span class="name">Settings</span>
                    </a>
                    {/* <!-- <i class='bx bxs-chevron-down'></i> --> */}
                </div>
                <div class="submenu">
                    <a href="#" class="link submenu-title">Settings</a>
                    {/* <!-- submenu links here  --> */}
                </div>
            </li>
        </ul>
    </div>

    {/* <!-- ============= Home Section =============== --> */}
    <section class="home bg-light">
        <div class="toggle-sidebar" onClick={logoClick}>
            <i class='bx bx-menu'></i>
        </div>
		<Header user={user}/>
    </section>
    </div>
  );
}
export default Sidebar;
