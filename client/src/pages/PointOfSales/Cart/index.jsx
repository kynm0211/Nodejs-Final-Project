import { useEffect, useState } from "react";
import CartItem from "./CartItem";
function CardDetail({AddToCart, UpdateCart}) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const [count, setCount] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState(null);
	const [update, setUpdate] = useState(true);
	const handleUpdateCartItem = () => setUpdate(!update);
	const handleUpdateCart = () => UpdateCart();

    useEffect(() => {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
        // Set count and reduceCart
        const tempCount = cart
            .map((item) => item.amount)
            .reduce((acc, cur) => acc + cur, 0);

        // Set total
        const subTotalTemp = cart
            .map((item) => item.retail_price * item.amount)
            .reduce((acc, cur) => acc + cur, 0);
        
        
        

        const taxfee = (subTotalTemp * tax) / 100;
        const totalTemp = subTotalTemp + taxfee;


        setTotal(totalTemp);
		setSubTotal(subTotalTemp);
        setCount(tempCount);

		const cartDetail = {
			subTotal: subTotalTemp,
			count: tempCount,
			taxfee: taxfee,
			total: totalTemp,
			tax: tax
		}

		// Store cart detail to localStorage
        localStorage.setItem('cartDetail', JSON.stringify(cartDetail));

    }, [AddToCart, tax]);


    const handleSetTax = (e) => {
        setError(null);
        const newTax = e.target.value;
        if (newTax < 0 || newTax > 100) {
            setError("Tax must be between 0 and 100");
        } else {
            setTax(newTax);
        }
		handleUpdateCart();
    };

    const handleReset = () => {
      localStorage.removeItem('cart');
	  handleUpdateCart();
    }

    const handleConfirmReset = () => {
        const btn = document.getElementById('btn-rs__cart');
        btn.addEventListener('click', handleReset);
    }

    return (
    <div className="card">
      <div className="card-header bg-dark text-light">
        Cart Detail
        <i className="fa-solid fa-cart-shopping ml-2"></i>
      </div>
      <div className="card-body">
        {cart.map((product, index) => {
          return <CartItem key={index}
		  	product={product}
			UpdateCart={UpdateCart}/>;
        })}
      </div>

      <div className="card-footer text-center">
        <div className="d-flex justify-content-between">
          <span>{count} items</span>
          <span>
            Subtotal: <strong>{formatCurrencyVND(subTotal)}</strong>
          </span>
        </div>
        <div className="text-right my-1">
          <label>Tax fee</label>
          <input
            placeholder="%"
            min={0}
            max={100}
            type="number"
            className="form-control"
            onChange={(e) => handleSetTax(e)}
          />
        </div>
        <div className="my-3">
          <span>
            Total: <strong>{formatCurrencyVND(total)}</strong>
          </span>
        </div>
        <div className="d-flex text-center justify-content-between">
          <button
            title="Click here to reset bill"
            className="btn btn-warning mr-3"
            data-toggle="modal" data-target="#resetModal"
			onClick={() => handleConfirmReset()}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
          <button
            disabled={error ? true : false}
            title="Click here to make a payment"
            className="btn btn-success"
            data-toggle="modal" data-target="#paymentModal"
          >
            PAYMENT
            <i className="fa-solid fa-chevron-right ml-3"></i>
          </button>
        </div>
        {error && (
          <div class="alert alert-danger mt-4">
            <strong>Error!</strong> {error}
          </div>
        )}
      </div>
    </div>
  );
  // Convert to currency
  function formatCurrencyVND(value) {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
      });

      return formatter.format(numericValue);
    } else {
      return "Invalid Number";
    }
  }
}

export default CardDetail;
