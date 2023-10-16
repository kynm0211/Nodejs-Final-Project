import ForgetPassword from '../pages/ForgetPassword';
import Upload from '../pages/Upload';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Setting from '../pages/Setting';
import Dashboard from '../pages/Dashboard';
import CreateSale  from '../pages/CreateSale';
import Profile from '../pages/Profile';
import ChangePassword from '../pages/ChangePassWord';
import UserList from '../pages/UserList';
import ResendEmail from '../pages/ResendEmail';
// Layouts
import {HeaderOnly} from '../components/Layout';


export const publicRouters = [
    { path: '/', element: Dashboard},
    { path: '/forget', element: ForgetPassword, layout: null},
    { path: '/upload', element: Upload, layout: HeaderOnly},
    { path: '/login', element: Login, layout: null},
    { path: '/logout', element: Logout, layout: null},
    { path: '/setting', element: Setting},
    { path: '/dashboard', element: Dashboard},
    { path: '/admin/create-sale', element: CreateSale},
    { path: '/profile', element: Profile},
    { path: '/change-password', element: ChangePassword},
    { path: '/admin/user-list', element: UserList},
    { path: '/admin/resend-email', element: ResendEmail},
];

export const privateRouters = [];

