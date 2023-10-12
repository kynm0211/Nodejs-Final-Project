import Home from '../pages/Home';
import ForgetPassword from '../pages/ForgetPassword';
import Upload from '../pages/Upload';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
// Layouts
import {HeaderOnly} from '../components/Layout/';


export const publicRouters = [
    { path: '/', element: Home},
    { path: '/forget', element: ForgetPassword},
    { path: '/upload', element: Upload, layout: HeaderOnly},
    { path: '/login', element: Login, layout: null},
    { path: '/logout', element: Logout, layout: null}
];

export const privateRouters = [];

