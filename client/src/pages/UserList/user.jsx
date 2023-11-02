import React, { useState, Fragment } from 'react';
import $ from 'jquery';
function UserItem({ index, user }) {


	const handleViewModal = (user) => {
		$('#modaluser__img').attr('src', user.image);
		$('#modal__username').html(user.name);
		$('#modal__email').html(user.email);
		$('#modal__role').html(user.role);
		$('#modal__status').html(user.status);
	}

	// const handleEditModal = (user) => {
	// 	$('#modal-title-userlist').html("Edit information");
	// 	$('#modal-body-userlist').html('asdasdasdasd');
	// }
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
          data-toggle="modal" data-target="#detailModal"
		  onClick={() => handleViewModal(user)}
        >
          <i className="fa-solid fa-circle-info mr-2"></i>
          Details
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm m-1"
          data-toggle="modal" data-target="#editModal"
        >
          <i className="fa-regular fa-pen-to-square mr-2"></i>
          Edit
        </button>
        <button
			data-toggle="modal" data-target="#deleteModal"
			type="button"
			className="btn btn-danger btn-sm m-1">
          <i className="fa-solid fa-trash mr-2"></i>
          Remove
        </button>
      </td>
    </tr>
    </Fragment>
  );
}

export default UserItem;
