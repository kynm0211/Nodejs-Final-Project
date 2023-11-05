function CartItem({product}) {
    return (
        <div className="d-flex my-1">
            <img src={product.image} width={100} alt="" />
            <div className="d-flex justify-content-between ml-2 phone__info w-100">
                <div className="d-flex flex-column">
                    <h5 className="">{product.name}</h5>
                    <span>{formatCurrencyVND(product.retail_price)}</span>
                </div>
                <div className="text-right">
                    <span>Quantity: {product.amount}</span>
                </div>
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

export default CartItem;