import ForgetPassword from '../pages/ForgetPassword';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Setting from '../pages/Setting';
import Dashboard from '../pages/Dashboard';
import CreateSale  from '../pages/CreateSale';
import Profile from '../pages/Profile';
import ChangePassword from '../pages/ChangePassWord';
import UserList from '../pages/UserList';
import ResendEmail from '../pages/ResendEmail';
import RenewPassword from '../pages/RenewPassword';
import DirectLogin from '../pages/DirectLogin';
//import ProductList from '../pages/ProductList';
import AddProduct from '../pages/AddProduct';
import ProductListAdmin from '../pages/ProductListAdmin';
import ProductListSaler from '../pages/ProductListSaler';
import POS from '../pages/PointOfSales';
import Product from '../pages/Product/detailProduct';

// Import Orders
import Orders from '../pages/Orders';


// Import Customers
import Customers from '../pages/Customers';
// Layouts
//import {HeaderOnly} from '../components/Layout';
import {POSLayout} from '../components/Layout';
import EditProduct from '../pages/Product/editProduct';


export const publicRouters = [
    { path: '/forget', element: ForgetPassword, layout: null},
    { path: '/login', element: Login, layout: null},
    { path: '/direct', element: DirectLogin, layout: null}
];

export const privateRouters = [
    { path: '/', element: Dashboard},
    { path: '/dashboard', element: Dashboard},
    { path: '/logout', element: Logout, layout: null},
    { path: '/setting', element: Setting},
    { path: '/profile', element: Profile},
    { path: '/change-password', element: ChangePassword},
    {path: '/renew-password', element: RenewPassword, layout: null},
];


export const adminRouters = [
    { path: '/user/create-sale', element: CreateSale},
    { path: '/user/user-list', element: UserList},
    { path: '/user/resend-email', element: ResendEmail},
    { path: '/product/list', element: ProductListAdmin},
    { path: '/product/product-management', element: ProductListAdmin},
    { path: '/product/add-new', element: AddProduct},
    { path: '/product/:barcode', element: Product},
    { path: '/product/edit/:barcode', element: EditProduct},
];

export const salerRouters = [
    { path: '/product/list', element: ProductListSaler},
    { path: '/point-of-sale', element: POS, layout: POSLayout},
    { path: '/product/:barcode', element: Product},
    { path: '/orders', element: Orders},
    { path: '/customers', element: Customers}
];

export const customerRouters = [];

