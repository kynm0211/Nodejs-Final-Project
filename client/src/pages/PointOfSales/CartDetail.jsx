import { useEffect } from "react";
import CartItem from "./CartItem";
function CardDetail({cart}) {
    useEffect(() => {
        console.log("Card Detail: ", cart);
    }, [cart]);


    return ( 
        <div className="card">
            <div className="card-header bg-dark text-light">
                Cart Detail
                <i className="fa-solid fa-cart-shopping ml-2"></i>
            </div>
            <div className="card-body">
                {cart.map((product, index)=> {
                    return (
                        <CartItem key={index} product={product}/>
                    )
                })}
            </div>


            <div className="card-footer text-center">
                <div className="d-flex justify-content-between">
                    <span>5 items</span>
                    <span>Subtotal: <strong>42.000.000 đ</strong></span>
                </div>
                <div className="text-right my-1">
                    <label>Tax fee</label>
                    <input placeholder="%" min={0} max={100} type="number" className="form-control"/>
                </div>
                <div className="my-3">
                    <span>Total: <strong>80.0000</strong></span>
                </div>
                <div className="d-flex text-center justify-content-between">
                    <button title="Click here to reset bill" className="btn btn-warning mr-3">
                        <i className="fa-solid fa-trash"></i>
                    </button>
                    <button title="Click here to make a payment" className="btn btn-success">PAYMENT
                        <i className="fa-solid fa-chevron-right ml-3"></i>
                    </button>
                </div>
            </div>
        </div>
     );
}

export default CardDetail;