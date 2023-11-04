import $ from 'jquery';

function DeleteModal() {
    const handleDeleteUser = () => {
        const userId = $('#id-delete').text();
        $.ajax({
          url: `/api/delete_user/${userId}`,
          method: 'DELETE',
          headers: {
            Authorization: localStorage.getItem('token'),
          },
          success: function (response) {
            window.location.reload();
          },
          error: function (error) {
            console.error('Lỗi xóa người dùng', error);
          },
        });
      };
    return ( 
    <div class="modal fade" id="deleteModal">
        <div class="modal-dialog">
            <div class="modal-content">

            <div class="modal-header">
                <h4 class="modal-title">Delete Confirmation</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body" id="modal-body-userlist">
                Are you sure that do you want to delete the user: <strong id="username-delete"></strong> ( ID: <strong id="id-delete"></strong> )
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-danger" onClick={handleDeleteUser}>Yes</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </div>

            </div>
        </div>
    </div>
    );
}

export default DeleteModal;