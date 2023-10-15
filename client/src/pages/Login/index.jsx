import React, { useState } from "react";
import './LoginRegister.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

export const Login = (props) => {
    const [login, setLogin] = useState(false);
    const [error, setError] = useState(null);

    function handleLogin(event) {
        setLogin(true);
        setError(null);

        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
    
        const data = {
            username: username,
            password: password,
        };
          
        axios.post('/api/login', data, {
            headers: {
              'Content-Type': 'application/json',
            }
        })
            .then(response => {
                const res = response.data;
                if (res.code === 0) {
                    const token = res.data.token;
                    localStorage.setItem('token', token);
                    window.location.href = '/';
                } else {
                    setError(res.message);
                }
                setLogin(false);
        })
          .catch(error => {
            setError(error);
            setLogin(false);
        });
    }
    return (
        <div className="wrapper fadeInDown d-flex align-items-center">
            <div id="formContent">
                {/* Tabs Titles */}
                <h2 className="active login_title">Sign In</h2>
                {/* Icon */}
                <div className="fadeIn first">
                <img 
                    src="https://firebasestorage.googleapis.com/v0/b/nodejs-final-8bdf4.appspot.com/o/919825.png?alt=media&token=29bd9385-a5f1-4e95-ab7b-86747f4d62f9"
                    id="icon"
                    alt="User Icon"
                    className="my-3"
                    />
                </div>

                {/* Login Form */}
                <form>
                    <input type="text" id="username" className="fadeIn second" name="username" placeholder="username" />
                    <input type="password" id="password" className="fadeIn third" name="password" placeholder="password" />
                    <input type="submit" id="login-btn" onClick={handleLogin} className="fadeIn fourth" value="Log In" disabled={login}/>
                    {error && <div className="alert alert-success">
                        <strong>Error!</strong> {error}
                    </div>}
                </form>
                {login && <img src="https://firebasestorage.googleapis.com/v0/b/nodejs-final-8bdf4.appspot.com/o/Dual%20Ring-1s-200px.gif?alt=media&token=1b30beed-915f-4d8d-b44e-e00514500cb4&_gl=1*4r51lr*_ga*NzkyMjQ3NDYxLjE2OTY5MjkyODU.*_ga_CW55HF8NVT*MTY5NzM4MzM4NS43LjEuMTY5NzM4NDE3OC40OS4wLjA."
                    width={50}
                />}                

                {/* Remind Password */}
                <div id="formFooter" className="mt-4">
                    <Link className="underlineHover" to="/forget">Forgot Password?</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
