import axios from 'axios';
import { useState, useEffect } from 'react';
import OrderList from '../../../components/OrderList';
function Transactions({customer_id}) {

    const [transactions, setTransactions] = useState(null);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);


    
    const handleFetchTransactions = async (id) => {
        axios.get('/api/customers/' + id + '/transactions', {
            headers: { 
                'Authorization': localStorage.getItem('token')
            }
        })
            .then(response => {
                const res = response.data;
                if(res.code === 0){
                    const trans = res.data.transactions;
                    setTransactions(trans);
                }else{
                    setError(res.message);
                }
            })
            .catch(error => {
                setError(error.message);
            });
    }

    useEffect(() => {
        handleFetchTransactions(customer_id);
    }, []);



    return ( 
        <div>
            <OrderList orders={transactions} />
        </div>
    );
}

export default Transactions;