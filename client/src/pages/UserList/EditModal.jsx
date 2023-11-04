import React, { useState } from 'react';
import $ from 'jquery';

function EditModal() {

    const user = {
        id: $('#edit__id').val(),
        username: $('#edit__username').val(),
        email: $('#edit__email').val(),
        role: $('#edit__role').val(),
        status: $('#edit__status').val(),
      };
      
  const [userData, setUserData] = useState({
    username: user.username,
    email: user.email,
    role: user.role,
    status: user.status,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    const updatedUser = {
      username: userData.username,
      email: userData.email,
      role: userData.role,
      status: userData.status,
    };

    $.ajax({
      url: `/api/update_user/${user.id}`,
      method: 'PUT',
      headers: {
        Authorization: localStorage.getItem('token'), 
      },
      data: updatedUser,
      success: function (response) {
        
        $('#editModal').modal('hide');
        window.location.reload();
      },
      error: function (error) {

        console.error('Lỗi cập nhật thông tin người dùng', error);
      },
    });
  };

  return (
    <div className="modal fade" id="editModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="modal-title-userlist">
              Edit Information
            </h4>
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="card">
              <div className="text-center">
                <img id="edit__img" className="card-img-top" alt="Card image" />
              </div>
              <div className="card-body">
              <div className="m-1">
                <h4 class="card-title" id='nameOfUser'></h4>
              </div>
              <div className="m-1">
                <span className="badge badge-secondary p-2 mr-2">ID: </span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control"
                  id="edit__id"
                  name="id"
                  value={userData.id}
                  onChange={handleInputChange}
                />
                </div>
              <div className="m-1">
                <span className="badge badge-secondary p-2 mr-2">Username: </span>
                <input
                  disabled="true"
                  type="text"
                  className="form-control"
                  id="edit__username"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                />
                </div>
                <div className="m-1">
                  <span className="badge badge-secondary p-2 mr-2">Email: </span>
                  <input
                    type="text"
                    className="form-control"
                    id="edit__email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="m-1">
                  <span className="badge badge-secondary p-2 mr-2">Role:</span>
                  <select
                      className="form-control"
                      id="edit__role"
                      name="role"
                      value={userData.role}
                      onChange={handleInputChange}
                  >
                      <option value="Administrator">Administrator</option>
                      <option value="Sale person">Sale person</option>
                      <option value="Customer">Customer</option>
                  </select>
              </div>


                <div className="m-1">
                  <span className="badge badge-secondary p-2 mr-2">Status: </span>
                  <select
                      className="form-control"
                      id="edit__status"
                      name="status"
                      value={userData.status}
                      onChange={handleInputChange}
                  >
                      <option value="Active">Active</option>
                      <option value="InActive">InActive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
