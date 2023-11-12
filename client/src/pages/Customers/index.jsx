import LoadingImg from '../../components/Layout/components/LoadingImg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Customer from './customer';
function Customers() {
    const [search, setSearch] = useState("");
    const [customers, setCustomers] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleFetchCustomers = async () => {
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
                console.log(res.data);
            }
            setLoading(true);
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
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
                        <div className="col-sm-12 col-md-12 col-lg-3">
                            <div className="form-group">
                                <label>Filter</label>
                                <select
                                    className="form-control"
                                    id="exampleFormControlSelect1"
                                    // onChange={e => setCategory(e.target.value)}
                                >
                                    <option value="">All product</option>
                                    <option value="Iphone">Iphone</option>
                                    <option value="Samsung">Samsung</option>
                                    <option value="Xiaomi">Xiaomi</option>
                                </select>
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
                <div className="card-footer">Footer</div>
            </div>
        </div>
    );
}

export default Customers;