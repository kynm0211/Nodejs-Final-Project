import UserItem from './user';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingImg from '../../components/Layout/components/LoadingImg';
import DetailModal from './DetailModal';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';


function UserList() {
    const [users, setUsers] = useState(null);
    const [role, setRole] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchUsers();

    }, [role, search]);

    const fetchUsers = async () => {
        setLoading(false);
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
            setLoading(true);
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
        });
    }

    const refreshUsers = async () => fetchUsers();
    return ( 
        <div>
            <div className="card rounded">
                <div className="card-header bg-success text-white text-center">
                    <h3>Manage user lists</h3>
                </div>
                <div className="card-body">
                    <div className="row my-3">
                        <div className="col-md-8">
                            <div className="form-outline mb-4">
                                <label>Enter the name or email for searching</label>
                                <input onChange={e => setSearch(e.target.value)} type="search" className="form-control" id="datatable-search-input" placeholder="Search"/>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label>Filter</label>
                                <select
                                    className="form-control"
                                    id="exampleFormControlSelect1"
                                    onChange={e => setRole(e.target.value)}
                                >
                                    <option value="">All users</option>
                                    <option value="Administrator">Administrator</option>
                                    <option value="Sale person">Sale person</option>
                                    <option value="Customer">Customer</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-1">
                            <label className='mr-1'>Click to refresh</label>
                            <button onClick={refreshUsers} className="btn btn-primary">
                                <i className="fa-solid fa-rotate-right mr-1"></i>
                                Refresh
                            </button>
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
                                {loading === false && <tr className='text-center'>
                                    <td colSpan={6}><LoadingImg /></td>
                                </tr>}
                                {loading && users && users
                                    .filter(user => user.role.includes(role)
                                        && (user.name.toLowerCase().includes(search.toLowerCase())
                                        || user.email.toLowerCase().includes(search.toLowerCase())))
                                    .map((user, index) => (
                                        <UserItem key={index} index={index + 1} user={user}/>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="card-footer">Footer</div>
            </div>
            <DetailModal />
            <EditModal/>
            <DeleteModal />
        </div>
    );
}

export default UserList;