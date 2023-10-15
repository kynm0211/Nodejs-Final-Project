import React, { useState } from "react";
import './LoginRegister.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

export const Login = (props) => {
    const [isSignUpActive, setIsSignUpActive] = useState(false);

    const togglePanel = () => {
        setIsSignUpActive(!isSignUpActive);
    };

    function handleLogin(event) {
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
                    console.log(res);
                }
        })
          .catch(error => {
            console.error('Login failed', error);
        });
    }
    return (
        <div id="bodyLogin">
            <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`} id="container">
                <div className="form-container sign-up-container">

                    <form action="/api/register" method="post">
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social"><FontAwesomeIcon icon={faFacebook} /></a>
                            <a href="#" className="social"><FontAwesomeIcon icon={faGoogle} /></a>
                            <a href="#" className="social"><FontAwesomeIcon icon={faTwitter} /></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input name="name" type="text" placeholder="Name" />
                        <input name="email" type="email" placeholder="Email" />
                        <input name="password" type="password" placeholder="Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form>
                        <h1>Sign in</h1>
                        <input  className="mb-2" id="username" name="username" type="username" placeholder="Username" />
                        <input id="password" name="password" type="password" placeholder="Password" />
                        <a href="/forget">Forgot your password?</a>
                        <button onClick={handleLogin}>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Final Project<br />NodeJS</h1>
                            <p>Already have account? <br />Click the button bellow:</p>
                            <button className="ghost" onClick={togglePanel}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Final Project<br />NodeJS</h1>
                            <p>Don't have account? <br />Click the button bellow:</p>
                            <button className="ghost" onClick={togglePanel}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
