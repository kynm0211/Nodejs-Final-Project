import UserItem from './user';
import { useState, useEffect } from 'react';
import axios from 'axios';
function UserList() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        axios.get('/api/users', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(response => {
            const res = response.data;
            if (res.code === 0) {
                setUsers(res.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }, []);    
    return ( 
        <div>
            <div className="card rounded">
                <div className="card-header bg-success text-white text-center">
                    <h3>Manage user lists</h3>
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
                                    {users && users.map((user, index) => (
                                        <UserItem key={index} index={index + 1} user={user}/>
                                    ))}
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