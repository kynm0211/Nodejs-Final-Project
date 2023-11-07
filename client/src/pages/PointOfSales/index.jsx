import { useState, useEffect } from "react";
import FindProducts from "./findProductBar";
import Products from "./Products";
import CardDetail from "./CartDetail";
function POS() {

    const [cart, setCart] = useState([]);

    const handleSetCart = (newState) => {
        setCart([...newState]);
    }

    const [reduce, setReduce] = useState([]);

    useEffect(() => {
        // Find duplicates in cart
        const duplicates = cart.reduce((acc, product) => {
            const found = acc.find((item) => item.barcode === product.barcode);
            if (found) {
            found.amount += 1;
            } else {
            acc.push({
                ...product,
                amount: 1,
            });
            }
            return acc;
        }, []);

        

        setReduce(duplicates);
    }, [cart]);

    const handleResetCart = () =>{
        setCart([]);
    }
    return ( 
        <div>
            <div className="row">
                <div className="col-md-8">
                    {/* Search or type barcode */}
                    <FindProducts />
                    {/* Product List */}
                    <Products AddToCart={handleSetCart}/>
                </div>
                <div className="col-md-4">
                    {/* Card Detail */}
                    <CardDetail cart={reduce} rsCart={handleResetCart}/>
                </div>
            </div>
        </div>
    );
}

export default POS;