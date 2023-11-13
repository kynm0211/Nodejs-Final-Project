import LoadingImg from '../../components/Layout/components/LoadingImg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import OrderItem from './order';
function Orders() {
    const [orders, setOrders] = useState(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        axios.get('/api/orders', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(response => {
                const res = response.data;
                if(res.code === 0){
                    setOrders(res.data);
                }else{
                    setError(res.message);
                }
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchOrders();
    },[search]);
    return ( 
        <div>
            <div className="card rounded">
                <div className="card-header bg-success text-white text-center">
                    <h3>Manage ordered list</h3>
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
                                        <th scope="col">Order Number</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Creation Date</th>
                                        <th scope="col">Option</th>

                                    </tr>
                                </thead>
                                <tbody>
                                {loading && <tr className='text-center'>
                                    <td colSpan={6}><LoadingImg /></td>
                                </tr>}
                                {orders && orders
                                    .filter(order => order.order_number && order.order_number.toLowerCase().includes(search.toLowerCase()))
                                    .map((order, index) => (
                                        <OrderItem key={index} index={index + 1} order={order} />
                                ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {error && (
                    <div className="card-footer">
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orders;