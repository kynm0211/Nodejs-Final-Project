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
import Error from '../pages/Error';
//import ProductList from '../pages/ProductList';
import AddProduct from '../pages/AddProduct';
import ProductListAdmin from '../pages/ProductListAdmin';
import ProductListSaler from '../pages/ProductListSaler';
import POS from '../pages/PointOfSales';
import Product from '../pages/Product/detailProduct';

// Import Orders
import Orders from '../pages/Orders';
import OrderDetail from '../pages/OrderDetail';

// Import Customers
import Customers from '../pages/Customers';
import CustomerDetail from '../pages/Customers/Detail';
// Layouts
//import {HeaderOnly} from '../components/Layout';
import {POSLayout} from '../components/Layout';
import EditProduct from '../pages/Product/editProduct';


export const publicRouters = [
    { path: '/forget', element: ForgetPassword, layout: null},
    { path: '/login', element: Login, layout: null},
    { path: '/direct', element: DirectLogin, layout: null},
    { path: '/*', element: Error, layout: null}
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
    { path: '/users', element: UserList},
    { path: '/user/resend-email', element: ResendEmail},
    { path: '/products', element: ProductListAdmin},
    { path: '/product/product-management', element: ProductListAdmin},
    { path: '/product/add-new', element: AddProduct},
    { path: '/product/:barcode', element: Product},
    { path: '/product/edit/:barcode', element: EditProduct},
];

export const salerRouters = [
    { path: '/products', element: ProductListSaler},
    { path: '/point-of-sale', element: POS, layout: POSLayout},
    { path: '/product/:barcode', element: Product},
    { path: '/orders', element: Orders},
    { path: '/customers', element: Customers},
    { path: 'orders/:order_number', element: OrderDetail},
    { path: 'customers/:id', element: CustomerDetail}
];

export const customerRouters = [];

