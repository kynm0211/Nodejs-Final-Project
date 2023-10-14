function UserList() {
    return ( 
        <div>
            <div class="card rounded">
                <div class="card-header bg-success text-white text-center">
                    <h3>User List</h3>
                </div>
                <div class="card-body">
                    <div className="row">
                        <div className="col-md-8">
                            <div class="form-outline mb-4">
                                <label>Enter the name or email for searching</label>
                                <input type="search" class="form-control" id="datatable-search-input" placeholder="Search"/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Filter</label>
                                <select class="form-control" id="exampleFormControlSelect1">
                                <option>Administrator</option>
                                <option>Sale person</option>
                                <option>Customer</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <table class="table table-striped rounded">
                        <thead class="thead-dark rounded">
                            <tr>
                                <th scope="col">Order</th>
                                <th scope="col">Fullname</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Status</th>
                                <th scope="col">Option</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Nguyễn Văn A</td>
                                <td>nguyenvana@gmail.com</td>
                                <td>Administator</td>
                                <td>
                                    <span class="badge badge-success">Active</span>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-outline-primary btn-sm mr-1">
                                        <i class="fa-solid fa-circle-info mr-2"></i>
                                        Details
                                    </button>
                                    <button type="button" class="btn btn-outline-secondary btn-sm mr-1">
                                        <i class="fa-regular fa-pen-to-square mr-2"></i>
                                        Edit
                                    </button>
                                    <button type="button" class="btn btn-danger btn-sm mr-1">
                                        <i class="fa-solid fa-trash mr-2"></i>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="card-footer">Footer</div>
            </div>
        </div>
    );
}

export default UserList;