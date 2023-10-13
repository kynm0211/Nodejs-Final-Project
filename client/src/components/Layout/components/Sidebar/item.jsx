import { Link } from 'react-router-dom';

function ItemSidebar({ title, url, icon, children }) {
  const shouldRenderForward = children ? false : true;
  return (
    <li>
      <div className="title">
        {shouldRenderForward ? (
          <Link to={url} className="link">
            <i className={`fa-3x ${icon}`} style={{ color: 'black' }}></i>
            <span className="name">{title}</span>
          </Link>
        ) : (
          <div className="link">
            <i className={`fa-3x ${icon}`} style={{ color: 'black' }}></i>
            <span className="name">{title}</span>
          </div>
        )}
      </div>
      <div className="submenu">
        <Link to={url} className="link submenu-title">
          {title}
        </Link>
        {/* <!-- submenu links here  --> */}
        {children}
      </div>
    </li>
  );
}

export default ItemSidebar;
