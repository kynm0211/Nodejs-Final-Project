import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemSidebar from './item';
import ItemDropDown from './itemdropdown';
import '../../../GlobalStyle/index.css';
function Sidebar() {
	const toggleSidebar = () => {
		const sidebar = document.querySelector(".sidebar");
		sidebar.classList.toggle("close");
	};
  return (
    <div className="sidebar-container bg-light">
      <div className="sidebar close bg-light" onClick={toggleSidebar}>
        {/* <!-- ========== Logo ============  --> */}
        <div className="logo-box" >
            <i class="fa-solid fa-bars"></i>
            <Link className="logo-name" to="/">NODEJS FINAL</Link>
        </div>


        {/* <!-- ========== List ============  --> */}
        <ul className="sidebar-list">
            {/* <!-- -------- Non Dropdown List Item ------- --> */}
            <ItemSidebar title="Dashboard" url="/dashboard" icon="fa-solid fa-house"/>
            <ItemSidebar title="Create Account" url="/admin/create-sale" icon="fa-solid fa-plus"/>
            {/* <!-- -------- Dropdown List Item ------- --> */}
            <ItemSidebar title="Component 1" url="/components" icon="fa-solid fa-plus">
                <ItemDropDown title="Phụ" url="/components1" iconName="plus"/>
                <ItemDropDown title="Phụ" url="/components1" />
                <ItemDropDown title="Phụ" url="/components1" />
                <ItemDropDown title="Phụ" url="/components1" />
            </ItemSidebar>

            <ItemSidebar title="Setting" url="/setting" icon="fa-solid fa-gear"/>

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
