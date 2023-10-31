import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import 'reactjs-popup/dist/index.css'; // Import CSS
import UserDetailDialog from '../../components/User/UserDetailDialog';

function UserItem({ index, user }) {
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  const handleDetailClick = () => setShowDetailDialog(!showDetailDialog);

  const handleCloseDetailDialog = () => setShowDetailDialog(!showDetailDialog);

  return (
    <Fragment>
      <tr>
      <th scope="row">{index}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <span className="badge badge-success">{user.status}</span>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm m-1"
          onClick={handleDetailClick}
        >
          <i className="fa-solid fa-circle-info mr-2"></i>
          Details
        </button>
        <Link
          to={"/admin/user-list/user?id=" + user._id + "&edit=true"}
          type="button"
          className="btn btn-outline-secondary btn-sm m-1"
        >
          <i className="fa-regular fa-pen-to-square mr-2"></i>
          Edit
        </Link>
        <button type="button" className="btn btn-danger btn-sm m-1">
          <i className="fa-solid fa-trash mr-2"></i>
          Remove
        </button>
      </td>
    </tr>
    {/* {showDetailDialog && (
        
    )} */}
    </Fragment>
  );
}

export default UserItem;
