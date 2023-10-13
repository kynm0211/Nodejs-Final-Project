// Admin.js
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Upload from '../upload';

const Admin = ({ user }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleMenuItemClick = (item) => setSelectedMenuItem(item);

  return (
    <div>
      <Sidebar user={user} onItemClick={handleMenuItemClick} selectedMenuItem={selectedMenuItem} />
      <h1>Admin Page</h1>
      <p>Welcome to the admin page!</p>
      {selectedMenuItem === 'upload'? <Upload /> : null}
      
    </div>
  );
};

export default Admin;
