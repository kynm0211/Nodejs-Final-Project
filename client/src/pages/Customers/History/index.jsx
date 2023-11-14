import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import OrderList from '../../../components/OrderList';
function History() {
    const {id} = useParams();
    const [transactions, setTransactions] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleFetchTransactions = async (id) => {
        axios.get('/api/customers/' + id + '/transactions', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(response => {
                const res = response.data;
                if(res.code === 0){
                    setTransactions(res.data.transactions);
                    setCustomer(res.data.customer);
                }else{
                    setError(res.message);
                }
            })
    }

    useEffect(() => {
        handleFetchTransactions(id);
    }, []);
    return ( 
        <div>
            <div class="card">
                <div className="card-header bg-main text-light">
                    <h3 className="text-uppercase">History transtions of {customer && customer.name}</h3>
                </div>
                <div class="card-body">
                    <OrderList orders={transactions} />
                </div>
                <div className="card-footer">
                    #{customer && customer._id}
                </div>
            </div>
        </div>
    );
}

export default History;