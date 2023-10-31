import React from 'react';
import 'reactjs-popup/dist/index.css'; // Import CSS

function UserDetailDialog({ user }) {
  return (
          <div className="modal">
            <h2>User Details</h2>
            <button className="close">
              &times;
            </button>
            <div className="header">User Details</div>
            <div className="content">
              <p>Name: </p>
              <p>Email: </p>
              <p>Role: </p>
              <p>Status: </p>
              {/* Hiển thị các thông tin người dùng khác ở đây */}
              <p>Other Info 1:</p>
              <p>Other Info 2: </p>
            </div>
            <div className="actions">
              <button className="button">
                Close
              </button>
            </div>
          </div>
  );
}

export default UserDetailDialog;
