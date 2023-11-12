import {Link} from 'react-router-dom';
import Num2VND from '../../components/Num2VND';
function OrderItem({index, order}) {

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