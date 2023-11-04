import FindProducts from "./findProductBar";
import Products from "./Products";
import CardDetail from "./CartDetail";
function POS() {
    return ( 
        <div>
            <div className="row">
                <div className="col-md-8">
                    {/* Search or type barcode */}
                    <FindProducts />
                    {/* Product List */}
                    <Products />
                </div>
                <div className="col-md-4">
                    {/* Card Detail */}
                    <CardDetail />
                </div>
            </div>
        </div>
    );
}

export default POS;