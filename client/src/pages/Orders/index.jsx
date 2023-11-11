import LoadingImg from '../../components/Layout/components/LoadingImg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import OrderItem from './order';
function Orders() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
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
                                {loading === false && <tr className='text-center'>
                                    <td colSpan={6}><LoadingImg /></td>
                                </tr>}
                                <OrderItem />
                                {/* {loading && products && products
                                    .filter(product => product.category.includes(category)
                                        && (product.name.toLowerCase().includes(search.toLowerCase())
                                        || product.barcode.toLowerCase().includes(search.toLowerCase())))
                                    .map((product, index) => (
                                        <ProductItem key={index} index={index + 1} product={product} />
                                    ))} */}
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

export default Orders;