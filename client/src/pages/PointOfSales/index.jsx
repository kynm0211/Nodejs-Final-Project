import FindProducts from "./findProductBar";
import Products from "./Products";
import CardDetail from "./CartDetail";
import { useState } from "react";
function POS() {

    const [cart, setCart] = useState(0);
    const AddToCart = () => {
        setCart(cart + 1);
    }
    // useEffect(() => {
    //     // Find duplicates in cart
    //     const duplicates = cart.reduce((acc, product) => {
    //         const found = acc.find((item) => item.barcode === product.barcode);
    //         if (found) {
    //         found.amount += 1;
    //         } else {
    //         acc.push({
    //             ...product,
    //             amount: 1,
    //         });
    //         }
    //         return acc;
    //     }, []);

        

    //     setReduce(duplicates);
    // }, [cart]);

    return ( 
        <div>
            <div className="row">
                <div className="col-md-8">
                    {/* Search or type barcode */}
                    <FindProducts />
                    {/* Product List */}
                    <Products AddToCart={AddToCart}/>
                </div>
                <div className="col-md-4">
                    {/* Card Detail */}
                    <CardDetail AddToCart={cart}/>
                </div>
            </div>
        </div>
    );
}

export default POS;