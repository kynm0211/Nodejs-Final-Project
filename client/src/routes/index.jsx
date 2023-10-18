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
// Layouts
//import {HeaderOnly} from '../components/Layout';


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
    { path: '/admin/create-sale', element: CreateSale},
    { path: '/admin/user-list', element: UserList},
    { path: '/admin/resend-email', element: ResendEmail},
];

export const salerRouters = [
];

export const customerRouters = [];

