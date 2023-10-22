import {Link} from 'react-router-dom';
function ProductItem({index, product}) {
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
    return ( 
        <tr>
            <th scope="row">{product.barcode}</th>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{formatCurrencyVND(product.retail_price)}</td>
            <td>{new Date(product.creation_date).toLocaleDateString()}</td>
            <td>
                <Link to={"/product/"+product.barcode} type="button" className="btn btn-outline-primary btn-sm m-1">
                    <i className="fa-solid fa-circle-info mr-2"></i>
                    Details
                </Link>
            </td>
        </tr>
     );
}

export default ProductItem;