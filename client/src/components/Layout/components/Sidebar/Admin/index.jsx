import { Fragment } from "react";
import ItemSidebar from "../item";
function AdminSideBar() {
    return ( 
        <Fragment>
            <ItemSidebar title="Dashboard" url="/dashboard" icon="fa-solid fa-house"/>
            <ItemSidebar title="Create Account" url="/admin/create-sale" icon="fa-solid fa-plus"/>
            <ItemSidebar title="User List" url="/admin/user-list" icon="fa-solid fa-rectangle-list"/>
            <ItemSidebar title="Re-send Email" url="/admin/resend-email" icon="fa-solid fa-paper-plane"/>
        </Fragment>
     );
}

export default AdminSideBar;