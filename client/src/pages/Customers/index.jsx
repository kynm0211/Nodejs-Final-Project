import LoadingImg from '../../components/Layout/components/LoadingImg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Customer from './customer';
function Customers() {
    const [search, setSearch] = useState("");
    const [customers, setCustomers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleFetchCustomers = async () => {
        setError(null);
        setLoading(false);
        axios.get('/api/customers', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(response => {
            const res = response.data;
            if (res.code === 0) {
                setCustomers(res.data);                
            }
            else{
                setError(res.message);
            }
            setLoading(true);
        })
        .catch(error => {
            setLoading(false);
            setError(error.message);
        });
    }

    useEffect(() => {
        handleFetchCustomers();
    }, [search]);
    return ( 
        <div>
            <div className="card rounded">
                <div className="card-header bg-success text-white text-center">
                    <h3>Customer List</h3>
                </div>
                <div className="card-body">
                    <div className="row my-3">
                        <div className="col-sm-12 col-md-12 col-lg-8">
                            <div className="form-outline mb-4">
                                <label>Enter the name or barcode for searching</label>
                                <input onChange={e => setSearch(e.target.value)} type="search" className="form-control" id="datatable-search-input" placeholder="Search"/>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-1">
                            <button className="btn btn-sm btn-primary">
                                <i class="fa-solid fa-rotate-right mr-1"></i>
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
                                        <th scope="col">Full of name</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Creation Date</th>
                                        <th scope="col">Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {loading === false && <tr className='text-center'>
                                    <td colSpan={6}><LoadingImg /></td>
                                </tr>}
                                {loading && customers && customers
                                    .filter(customer => (customer.name.toLowerCase().includes(search.toLowerCase())
                                        || customer.phone.toLowerCase().includes(search.toLowerCase())))
                                    .map((customer, index) => (
                                        <Customer key={index} index={index + 1} customer={customer} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {error && (
                    <div className="card-footer">
                        <div class="alert alert-success">
                            <strong>Error!</strong> {error}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Customers;