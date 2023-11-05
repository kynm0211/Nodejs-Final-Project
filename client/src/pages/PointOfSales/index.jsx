import { useState } from "react";
import FindProducts from "./findProductBar";
import Products from "./Products";
import CardDetail from "./CartDetail";
function POS() {

    const [cart, setCart] = useState([]);

    const handleSetCart = (newState) => {
        setCart([...newState]);
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
                    <CardDetail cart={cart}/>
                </div>
            </div>
        </div>
    );
}

export default POS;