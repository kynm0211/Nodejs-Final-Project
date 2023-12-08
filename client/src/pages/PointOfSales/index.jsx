
import FindProducts from "./FindProducts";
import Products from "./Products";
import CardDetail from "./Cart";
import { useState, Fragment, useEffect } from "react";
import DeleteModal from "./Modal/DeleteModal";
import ResetModal from "./Modal/ResetModal";
import PaymentModal from "./Modal/PaymentModal";
import InvoiceTab from "./Modal/PaymentComponents/InvoiceTab";
function POS() {

    const [searchResults, setSearchResults] = useState([]);

    const handleSearchResults = (data) => {
        setSearchResults(data);
    };



    const [cart, setCart] = useState(0);

    const AddToCart = () => {
        setCart(cart + 1);
    }


    return ( 
        <Fragment>
            <div className="row">
                <div className="col-md-8">
                    {/* Search or type barcode */}
                    <FindProducts onSearch={handleSearchResults} />
                    {/* Product List */}
                    <Products searchResults={searchResults} AddToCart={AddToCart}/>
                </div>
                <div className="col-md-4 position-fixed w-100" style={{right:'0'}}>
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