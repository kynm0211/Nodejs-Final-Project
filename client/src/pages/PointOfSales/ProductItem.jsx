import {Link} from 'react-router-dom';
function ProductItem({product, AddToCart}) {

    const handleAddToCart = (product) => {
        const storedCart = localStorage.getItem('cart');
        const cart = storedCart ? JSON.parse(storedCart) : [];

        if(cart.length === 0) {
            cart.push({
                ...product,
                amount: 1,
            });
            localStorage.setItem('cart', JSON.stringify(cart));
        }else{
            // insert a new product into cart if it dupplicates add amount to 1
            let flag = false;
            for(let i = 0; i < cart.length; i++){
                if(cart[i].barcode === product.barcode){
                    cart[i].amount += 1;
                    flag = true;
                    break;
                }
            }

            if(!flag){
                cart.push({
                    ...product,
                    amount: 1,
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            
        }

        AddToCart();
    }

    let name;
    if (product.name.length > 32) {
        name = product.name.slice(0, 32) + '...';
    } else {
        name = product.name;
    }
    return ( 
        <div className="col-md-4 p-2">
            <div className="card border-rounded">
                <div className="card-body">
                    <div className="text-right mb-2">
                        <Link title='Click here to view more detail' className="btn btn-sm btn-primary" to={"/product/"+product.barcode}>
                            <i className="fa-solid fa-circle-info"></i>
                        </Link>
                    </div>
                    <img src={product.image} alt="Image" width={'100%'} />
                    <div className="card__title mt-2">
                        <h5 title={product.name}>{name}</h5>
                    </div>
                    <div className="text-center text-danger">
                        <span>{formatCurrencyVND(product.retail_price)}</span>
                    </div>
                </div>
                <div className="card-footer text-center">
                    <button className="btn btn-success"
                     onClick={() => handleAddToCart(product)}
                    >Add to cart
                        <i className="fa-solid fa-cart-plus ml-1"></i>
                    </button>
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

export default ProductItem;