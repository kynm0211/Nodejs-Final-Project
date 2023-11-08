import ProductTab from "./PaymentComponents/ProductTab";
import DetailFee from "./PaymentComponents/DetailFee";
import CustomerTab from "./PaymentComponents/CustomerTab";
import InvoiceTab from "./PaymentComponents/InvoiceTab";
import { useEffect, useState } from "react";
function PaymentModal({UpdateCart}) {

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')) || []);
    }, [UpdateCart]);


    return ( 
        <div class="modal fade" id="paymentModal">
            <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content">
            
                <div class="modal-header bg-main text-light">
                    <h4 class="modal-title">Payment Confirmation</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                <div class="modal-body">
                    <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab" href="#products_tab">Products</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#customer_tab">Customer</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#invoice_tab">Invoice</a>
                        </li>
                    </ul>

                    {/* <!-- Tab panes --> */}
                    <div class="tab-content">
                        <div id="products_tab" class="container tab-pane active"><br/>
                            <ProductTab cart={cart}/>
                        </div>
                        <div id="customer_tab" class="container tab-pane fade"><br/>
                            <CustomerTab />
                        </div>
                        <div id="invoice_tab" class="container tab-pane fade"><br/>
                            <InvoiceTab>
                                <ProductTab cart={cart}/>
                            </InvoiceTab>
                        </div>
                    </div>

                    {/* Footer tabs */}
                    <DetailFee/>
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                
            </div>
            </div>
        </div>
    );
}

export default PaymentModal;