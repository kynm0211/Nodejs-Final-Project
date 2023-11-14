import axios from 'axios';
import { useState, useEffect } from 'react';
import LoadingImg from '../../../components/Layout/components/LoadingImg';
import TransItem from './TransItem';
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
                        {transactions && transactions
                            .filter(transaction => transaction.order_number && transaction.order_number.toLowerCase().includes(search.toLowerCase()))
                            .map((transaction, index) => (
                                <TransItem key={index} index={index + 1} item={transaction} />
                        ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Transactions;