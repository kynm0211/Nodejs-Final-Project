function UserList() {
    return ( 
        <div>
            <div className="card rounded">
                <div className="card-header bg-success text-white text-center">
                    <h3>User List</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="form-outline mb-4">
                                <label>Enter the name or email for searching</label>
                                <input type="search" className="form-control" id="datatable-search-input" placeholder="Search"/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Filter</label>
                                <select className="form-control" id="exampleFormControlSelect1">
                                <option>Administrator</option>
                                <option>Sale person</option>
                                <option>Customer</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 center-table">
                            <table className="table table-responsive-sm table-responsive-md table-striped rounded text-center">
                                <thead className="thead-dark rounded">
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
                                            <span className="badge badge-success">Active</span>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-outline-primary btn-sm mr-1">
                                                <i className="fa-solid fa-circle-info mr-2"></i>
                                                Details
                                            </button>
                                            <button type="button" className="btn btn-outline-secondary btn-sm mr-1">
                                                <i className="fa-regular fa-pen-to-square mr-2"></i>
                                                Edit
                                            </button>
                                            <button type="button" className="btn btn-danger btn-sm mr-1">
                                                <i className="fa-solid fa-trash mr-2"></i>
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="card-footer">Footer</div>
            </div>
        </div>
    );
}

export default UserList;