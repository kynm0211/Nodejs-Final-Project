function ProductItem({index, product}) {
    return ( 
        <tr>
            <td>{index}</td>
            <td>
                <img src={product.image} width={50} />
            </td>
            <td>{product.name}</td>
            <td>{formatCurrencyVND(product.retail_price)}</td>
            <td>{product.amount}</td>
        </tr>
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