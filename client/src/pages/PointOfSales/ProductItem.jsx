function ProductItem({product}) {

    let name;
    if (product.name.length > 20) {
        name = product.name.slice(0, 20) + '...';
    } else {
        name = product.name;
    }
    return ( 
        <div className="col-md-4 p-2">
            <div class="card border-rounded">
                <div class="card-body">
                    <img src="https://didongmoi.com.vn/data/cms-image/fix%20h%C3%ACnh/xuat-hien-iphone-xs-max-gia-3-trieu-dong-tiet-lo-bi-quyet-phan-biet-that-gia-1.jpg" alt="" width={'100%'} />
                    <div className="card__title mt-2">
                        <h5 title={product.name}>{name}</h5>
                    </div>
                    <div className="text-center text-danger">
                        <span>{formatCurrencyVND(product.retail_price)}</span>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <button className="btn btn-success">Add to cart
                        <i className="fa-solid fa-cart-plus ml-1"></i>
                    </button>
                </div>
            </div>                
        </div>
    );

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