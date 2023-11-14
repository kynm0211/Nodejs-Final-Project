import LoadingImg from '../../components/Layout/components/LoadingImg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import OrderList from '../../components/OrderList';
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
                   <OrderList orders={orders} />
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