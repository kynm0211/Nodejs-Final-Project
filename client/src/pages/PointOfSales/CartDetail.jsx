import { useEffect, useState } from "react";
import CartItem from "./CartItem";
function CardDetail({cart}) {

    const [reduceCart, setReduceCart] = useState([]);
    const [count, setCount] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState(null);
    // const [reset, setReset] = useState(false);
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
        }, [])

        // Set count and reduceCart
        const tempCount = duplicates.map((item) => item.amount).reduce((acc, cur) => acc + cur, 0);
        setCount(tempCount);

        // Set total
        const subTotalTemp = duplicates.map((item) => item.retail_price * item.amount).reduce((acc, cur) => acc + cur, 0); 
        setSubTotal(subTotalTemp);


        setReduceCart(duplicates);

        setTotal(subTotal + (subTotal * tax / 100));

    }, [cart, tax, subTotal]);

    const handleSetTax = (e) => {
        setError(null);
        const tax = e.target.value;
        if(tax < 0 || tax > 100) {
            setError('Tax must be between 0 and 100');
        }else{
            setTax(e.target.value)
        }
    }


    const handleReset = () => {
        setReduceCart([]);
        setCount(0);
        setSubTotal(0);
        setTax(0);
        setTotal(0);
        

        console.log(reduceCart);
    }
    return ( 
        <div className="card">
            <div className="card-header bg-dark text-light">
                Cart Detail
                <i className="fa-solid fa-cart-shopping ml-2"></i>
            </div>
            <div className="card-body">
                {reduceCart.map((product, index)=> {
                    return (
                        <CartItem key={index} product={product}/>
                    )
                })}
            </div>


            <div className="card-footer text-center">
                <div className="d-flex justify-content-between">
                    <span>{count} items</span>
                    <span>Subtotal: <strong>{formatCurrencyVND(subTotal)}</strong></span>
                </div>
                <div className="text-right my-1">
                    <label>Tax fee</label>
                    <input
                        placeholder="%"
                        min={0} max={100}
                        type="number"
                        className="form-control"
                        onChange={(e) => handleSetTax(e)}
                    />
                </div>
                <div className="my-3">
                    <span>Total: <strong>{formatCurrencyVND(total)}</strong></span>
                </div>
                <div className="d-flex text-center justify-content-between">
                    <button onClick={()=> handleReset()} title="Click here to reset bill" className="btn btn-warning mr-3">
                        <i className="fa-solid fa-trash"></i>
                    </button>
                    <button
                        disabled={error? true: false}
                        title="Click here to make a payment"
                        className="btn btn-success">PAYMENT
                        <i className="fa-solid fa-chevron-right ml-3"></i>
                    </button>
                </div>
                {error &&<div class="alert alert-danger mt-4">
                    <strong>Error!</strong> {error}
                </div>}
            </div>
        </div>
    );
    // Convert to currency
    function formatCurrencyVND(value) {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
            const formatter = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                minimumFractionDigits: 0,
            });
    
            return formatter.format(numericValue);
        } else {
            return 'Invalid Number';
        }
    }
}

export default CardDetail;