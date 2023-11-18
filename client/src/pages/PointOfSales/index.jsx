import FindProducts from "./FindProducts";
import Products from "./Products";
import CardDetail from "./Cart";
import { useState, Fragment } from "react";
import DeleteModal from "./Modal/DeleteModal";
import ResetModal from "./Modal/ResetModal";
import PaymentModal from "./Modal/PaymentModal";
import InvoiceTab from "./Modal/PaymentComponents/InvoiceTab";
function POS() {

    const [cart, setCart] = useState(0);

    const AddToCart = () => {
        setCart(cart + 1);
    }

    return ( 
        <Fragment>
            <div className="row">
                <div className="col-md-8">
                    {/* Search or type barcode */}
                    <FindProducts />
                    {/* Product List */}
                    <Products AddToCart={AddToCart}/>
                </div>
                <div className="col-md-4">
                    {/* Card Detail */}
                    <CardDetail AddToCart={cart} UpdateCart={AddToCart}/>
                </div>
            </div>
            {/* Delete modal dialog */}
            <DeleteModal />
            {/* Reset Modal dialog */}
            <ResetModal />
            {/* Payment Modal dialog */}
            <PaymentModal UpdateCart={cart} resetCart={AddToCart}/>
            {/* Invoice Modal dialog */}
            <InvoiceTab />
        </Fragment>
    );
}

export default POS;