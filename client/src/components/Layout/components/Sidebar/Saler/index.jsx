import { Fragment } from "react";
import ItemSidebar from "../item";
function SalerSideBar() {
    return (
        <Fragment>
            {/* <!-- -------- Non Dropdown List Item ------- --> */}
            <ItemSidebar title="Dashboard" url="/dashboard" icon="fa-solid fa-home"/>
            <ItemSidebar title="Product" url="/product/list" icon="fa-solid fa-box"/>
            <ItemSidebar title="POS" url="/point-of-sale" icon="fa-solid fa-calculator"/>
            <ItemSidebar title="Order" url="/order" icon="fa-solid fa-shopping-cart"/>
            <ItemSidebar title="Customer" url="/customer" icon="fa-solid fa-users"/>
        </Fragment>
    );
}

export default SalerSideBar;