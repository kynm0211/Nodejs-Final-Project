import LoadingImg from '../../components/Layout/components/LoadingImg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BodyAnalyst from './analystPage';
import Pagination from '../../components/Pagination';
import { useLocation } from 'react-router-dom';
import { forEach } from 'lodash';
import Num2VND from "../../components/Num2VND";

function Dashboard() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');

    
    const [orders, setOrders] = useState(null);
    const [divider, setDivider] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchAllOrders = async () => {
        setLoading(true);
        setError(null);
        axios.get('/api/orders/allOrders', {
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
        fetchAllOrders();
    },[]);
    return ( 
        <div className="card rounded">
            <div className="card-header bg-main text-main text-center">
                <h3>ANALYST</h3>
            </div>
            <div className="card-body">
                <BodyAnalyst orders={orders} fetch={fetchAllOrders}/>
                {/* <div className="row">
                    <Pagination root='orders' divider={divider}/>
                </div> */}
            </div>
            {error && (
                <div className="card-footer">
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                </div>
            )}
            {loading && (
                <div className="card-footer">
                    <div className="text-center">
                        <LoadingImg />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;