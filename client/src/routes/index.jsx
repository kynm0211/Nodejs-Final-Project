import Home from '../pages/Home';
import ForgetPassword from '../pages/ForgetPassword';
import Upload from '../pages/Upload';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Setting from '../pages/Setting';
import Dashboard from '../pages/Dashboard';
import CreateSale  from '../pages/CreateSale';

// Layouts
import {HeaderOnly} from '../components/Layout';


export const publicRouters = [
    { path: '/', element: Home},
    { path: '/forget', element: ForgetPassword},
    { path: '/upload', element: Upload, layout: HeaderOnly},
    { path: '/login', element: Login, layout: null},
    { path: '/logout', element: Logout, layout: null},
    { path: '/setting', element: Setting},
    { path: '/dashboard', element: Dashboard},
    { path: '/admin/create-sale', element: CreateSale}
];

export const privateRouters = [];

