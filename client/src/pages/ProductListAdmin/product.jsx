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
            <td>{formatCurrencyVND(product.import_price)}</td>
            <td>{formatCurrencyVND(product.retail_price)}</td>
            <td>
                <Link to={"/admin/user-list/product?id="+product.barcode} type="button" className="btn btn-outline-primary btn-sm m-1">
                    <i className="fa-solid fa-circle-info mr-2"></i>
                    Details
                </Link>
                <Link to={"/admin/user-list/product?id="+product.barcode+"&edit=true"} type="button" className="btn btn-outline-secondary btn-sm m-1">
                    <i className="fa-regular fa-pen-to-square mr-2"></i>
                    Edit
                </Link>
                <button type="button" className="btn btn-danger btn-sm m-1">
                    <i className="fa-solid fa-trash mr-2"></i>
                    Remove
                </button>
            </td>
        </tr>
     );
}

export default ProductItem;