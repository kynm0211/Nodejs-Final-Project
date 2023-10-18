import React from 'react';
import { useLocation } from 'react-router-dom'; 
function DirectLogin() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    return ( 
        <div>
            <h1>Direct Login</h1>
            <p>Token: {token}</p>
        </div>
    );
}

export default DirectLogin;