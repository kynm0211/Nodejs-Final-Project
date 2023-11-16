import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Pagination from "../../../components/Pagination";

function Products({AddToCart}) {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');

    const [products, setProducts] = useState([]);
    const [divider, setDivider] = useState(1);

    useEffect(() => {
        handleFetchProducts();

    }, [page]);

    const handleFetchProducts = async () => {
        axios.get('/api/products?page='+page, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(response => {
            const res = response.data;
            if (res.code === 0) {
                setProducts(res.data.products);
                setDivider(res.data.divider);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    
    return (
        <div className="row mt-5">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            {products.map((product) => (
                                <ProductItem
                                    key={product._id}
                                    product={product}
                                    AddToCart={AddToCart}
                                />
                            ))}
                        </div>
                        <div className="row">
                            <Pagination root='point-of-sale' divider={divider}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;
