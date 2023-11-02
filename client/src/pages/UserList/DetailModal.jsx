function DetailModal() {
    return (
    <div class="modal fade" id="detailModal">
        <div class="modal-dialog">
            <div class="modal-content">

            <div class="modal-header">
                <h4 class="modal-title" id="modal-title-userlist">Detail Information</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body" id="modal-body-userlist">
                <div class="card">
                    <img id="modaluser__img" class="card-img-top" alt="Card image" />
                    <div class="card-body">
                        <h4 class="card-title" id="modal__username">username</h4>
                        <div className="m-1">
                            <span class="badge badge-secondary p-2 mr-2">Email: </span>
                            <span id="modal__email"></span>
                        </div>
                        <div className="m-1">
                            <span class="badge badge-secondary p-2 mr-2">Role: </span>
                            <span id="modal__role"></span>
                        </div>
                        <div className="m-1">
                            <span class="badge badge-secondary p-2 mr-2">Status: </span>
                            <span id="modal__status"></span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>

            </div>
        </div>
    </div>
    );
}

export default DetailModal;