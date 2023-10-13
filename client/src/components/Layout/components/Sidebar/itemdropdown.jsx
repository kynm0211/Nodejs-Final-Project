import {Link} from 'react-router-dom';
function ItemDropDown({title, url}) {
    return ( 
        <Link to={url} className="link">{title}</Link>
     );
}

export default ItemDropDown;