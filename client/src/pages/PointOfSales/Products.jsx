import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";
import axios from "axios";
function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        handleFetchProducts();
        console.log(products);
    }, []);


    const handleFetchProducts = async () => {
        axios.get('/api/products', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(response => {
            const res = response.data;
            if (res.code === 0) {
                setProducts(res.data);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }


    return ( 
        <div className="row mt-5">
            <div className="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div className="row">
                            {products && products.map((product, index) => (
                                <ProductItem key={index} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;