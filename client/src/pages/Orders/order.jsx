import {Link} from 'react-router-dom';
function OrderItem({index, order}) {
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
            <th scope="row">1</th>
            <td>123123</td>
            <td>120000</td>
            <td>12</td>
            <td>1/1/2023</td>
            <td>
                <Link to={"/orders/"} type="button" className="btn btn-outline-primary btn-sm m-1">
                    <i className="fa-solid fa-circle-info mr-2"></i>
                    Details
                </Link>
            </td>
        </tr>
     );
}

export default OrderItem;