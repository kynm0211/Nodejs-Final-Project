import {Link} from 'react-router-dom';
import Num2VND from '../../components/Num2VND';
function OrderItem({index, order}) {

    return ( 
        <tr>
            <th scope="row">{index}</th>
            <td>{order.order_number}</td>
            <td>{Num2VND(order.total)}</td>
            <td>{order.quantity}</td>
            <td>{new Date(order.created_date).toDateString()}</td>
            <td>
                <Link to={"/orders/"+order.order_number} type="button" className="btn btn-outline-primary btn-sm m-1">
                    <i className="fa-solid fa-circle-info mr-2"></i>
                    Details
                </Link>
            </td>
        </tr>
     );
}

export default OrderItem;