function CartItem({product}) {
    return (
        <div className="d-flex my-1">
            <img src={product.image} width={100} alt="" />
            <div className="d-flex justify-content-between ml-2 phone__info w-100">
                <div className="d-flex flex-column">
                    <h5 className="">{product.name}</h5>
                    <span>{product.retail_price}</span>
                </div>
                <div className="text-right">
                    <span>Quantity: {product.amount}</span>
                </div>
            </div>
        </div>
    );
}

export default CartItem;