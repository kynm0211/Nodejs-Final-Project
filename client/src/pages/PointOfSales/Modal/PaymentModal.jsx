import ProductTab from "./PaymentComponents/ProductTab";
import DetailFee from "./PaymentComponents/DetailFee";
import CustomerTab from "./PaymentComponents/CustomerTab";
import InvoiceTab from "./PaymentComponents/InvoiceTab";
import { useEffect, useState } from "react";
import $ from 'jquery';
import LoadingImg from "../../../components/Layout/components/LoadingImg";
import axios from 'axios';

function PaymentModal({UpdateCart}) {

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [payable, setPayable] = useState(false);
    

    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')) || []);
    }, [UpdateCart, payable]);


    const handleMakePayment = () => {
        try{
            setError(null);
        setLoading(true);
        const taxrate = JSON.parse(localStorage.getItem('cartDetail')).tax;
        const customer = localStorage.getItem('customer');
        const cart = localStorage.getItem('cart');
        const token = localStorage.getItem('token');
        const payment = {
            taxrate: taxrate,
            customer: customer,
            cart: cart,
            token: token
        }
        axios.post('/api/create-a-bill', payment)
            .then(response => {
                const data = response.data;
                if(data.code !== 0){
                    setError(data.message);
                }else{
                    const order = data.data;
                    const order_number = order.order_number;
                    let order_detail;
                    axios.get('/api/find-order-detail/'+order_number)
                        .then(response => {
                            const data = response.data;
                            if(data.code !== 0){
                                setError(data.message);
                            }else{
                                order_detail = data.data;
                                const products = order_detail.products;

                                let tempInvoice = order;
                                tempInvoice.products = products;
                                setInvoice(tempInvoice);
                                $("#invoiceModal").modal('show');

                            }
                        })
                        .catch(error => {
                            setError(error);
                        })
                    // $("#paymentModal").modal('hide');
                }
                setLoading(false);
                // localStorage.removeItem('cart');
                // localStorage.removeItem('cartDetail');
                // localStorage.removeItem('customer');
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
        }
        catch(error){
            setError(error);
            setLoading(false);
        }
    }

    const handleCheckPayable = (value) => setPayable(value);
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
                    </ul>

                    {/* <!-- Tab panes --> */}
                    <div class="tab-content">
                        <div id="products_tab" class="container tab-pane active"><br/>
                            <ProductTab cart={cart}>
                                <DetailFee />
                            </ProductTab>
                        </div>
                        <div id="customer_tab" class="container tab-pane fade"><br/>
                            <CustomerTab isPay={handleCheckPayable}/>
                        </div>
                    </div>
                    {loading && <div className="text-center">
                        <LoadingImg />
                    </div>}
                    {error && <div className="alert alert-danger">
                        <strong>Error!</strong> {error}
                    </div>}
                </div>
                
                <div class="modal-footer">
                    <button
                        onClick={handleMakePayment}
                        id="btn_make-payment"
                        type="button" class="btn btn-success"
                        disabled={payable ? false : true}
                    >MAKE A PAYMENT</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                {invoice && <InvoiceTab invoice={invoice}/>}
            </div>
            </div>
        </div>
    );
}

export default PaymentModal;