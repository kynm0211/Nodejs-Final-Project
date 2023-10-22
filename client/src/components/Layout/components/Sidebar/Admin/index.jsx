import { Fragment } from "react";
import ItemSidebar from "../item";
import ItemDropDown from "../itemdropdown";
function AdminSideBar() {
    return ( 
        <Fragment>
            <ItemSidebar title="Dashboard" url="/dashboard" icon="fa-solid fa-house"/>
            <ItemSidebar title="User Management" url="/user/user-list" icon="fa-solid fa-users">
                <ItemDropDown title="User List" url="/user/user-list" icon="fa-solid fa-rectangle-list"/>
                <ItemDropDown title="Create Account" url="/user/create-sale" icon="fa-solid fa-plus"/>
                <ItemDropDown title="Re-send Email" url="/user/resend-email" icon="fa-solid fa-paper-plane"/>
            </ItemSidebar>
            <ItemSidebar title="Product Management" url="/product/product-management" icon="fa-solid fa-box">
                <ItemDropDown title="Product List" url="/product/list" icon="fa-solid fa-cube"/>
                <ItemDropDown title="Add a new" url="/product/add-new" icon="fa-solid fa-plus"/>
            </ItemSidebar>
        </Fragment>
     );
}

export default AdminSideBar;