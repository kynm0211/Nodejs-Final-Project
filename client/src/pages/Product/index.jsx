import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function Product() {
    const { barcode } = useParams();
    const [product, setProduct] = useState(null);

    function formatCurrencyVND(value) {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0,
            });
    
            return formatter.format(numericValue);
        } else {
            return 'Invalid Number';
        }
    }

    useEffect(() => {
        fetchProduct();

    }, []);

    const fetchProduct = async () =>{
        axios.get(`/api/product/${barcode}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(response => {
            const res = response.data;
            if (res.code === 0) {
                setProduct(res.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
    return ( 
        <div class="card">
            <div class="card-header bg bg-info text-white text-center">
                <h3>PRODUCT INFORMATION</h3>
            </div>
            {product && (
                <div class="card-body">
                    <div className="row mt-4">
                        <div className="col-md-3">
                            <img src={product.image} alt={product.name} className='product-img-preview'/>
                        </div>
                        <div className="col-md-9">
                            <div className="">
                                <h4>{product.name}</h4>
                            </div>
                            <div className="">
                                <span>Category: {product.category}</span>
                            </div>
                            <div className="">
                                <span>Price: {formatCurrencyVND(product.retail_price)}</span>
                            </div>
                            <div className="">
                                <span>Quantity: {product.quantity}</span>
                            </div>
                            <div className="">
                            <span>Creation Date: {new Date(product.creation_date).toLocaleDateString()}</span>
                            </div>
                            <div className="">
                                <span>Barcode: {product.barcode}</span>
                            </div>
                            <div className="">
                                <div className="">Description</div>
                                <span>
                                    {product.description}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Product;