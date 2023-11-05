import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";
import axios from "axios";

function Products({AddToCart}) {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        handleFetchProducts();

        // Find duplicates in cart
        const reduceCart = cart.reduce((acc, product) => {
            const found = acc.find((item) => item._id === product._id);
            if (found) {
                found.amount += 1;
            } else {
                acc.push({
                    ...product,
                    amount: 1,
                });
            }
            return acc;
        }, [])
        AddToCart(reduceCart);
    }, [cart]);

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

    const handleSetCart = (newState) => {
        setCart([...cart, newState]);
    };

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
                                    addToCart={handleSetCart}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;
