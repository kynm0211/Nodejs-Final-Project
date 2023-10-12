import React, { useState } from "react";
import './LoginRegister.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

export const CreateSalePerson = (props) => {
    const [isSignUpActive, setIsSignUpActive] = useState(false);

    const togglePanel = () => {
        setIsSignUpActive(!isSignUpActive);
    };

    function handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
    
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        axios.post('/api/login', formData)
        .then(response => {
            const res = response.data;
            if(res.code === 0){
                const token = res.data.token;
                localStorage.setItem('token', token);
                window.location.href = '/';
            }else{
                console.log(res);
            }
        })
        .catch(error => {
            console.error('Đăng nhập thất bại', error);
        });
    }

    function handleRegister(event) {
        event.preventDefault();
        const name = document.getElementById("nameR").value;
        const email = document.getElementById("emailR").value;
        const password = document.getElementById("passwordR").value;
        const role = document.getElementById("roleR").value;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('role', role);

        axios.post('/api/register', formData)
        .then(response => {
            const res = response.data;
            if(res.code === 0){
                const token = res.data.token;
                localStorage.setItem('token', token);
                window.location.href = '/';
            }else{
                console.log(res);
            }
        })
        .catch(error => {
            console.error('Đăng ký thất bại', error);
        });
    }

    return (
        <div id="bodyLogin">
            <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`} id="container">
                <div className="form-container sign-up-container">

                    <form onSubmit={handleRegister}>
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social"><FontAwesomeIcon icon={faFacebook} /></a>
                            <a href="#" className="social"><FontAwesomeIcon icon={faGoogle} /></a>
                            <a href="#" className="social"><FontAwesomeIcon icon={faTwitter} /></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input name="nameR" id="nameR" type="text" placeholder="Name" />
                        <input name="emailR" id="emailR" type="email" placeholder="Email" />
                        <input name="roleR" id="roleR" type="text" placeholder="Role" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form>
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="#" className="social"><FontAwesomeIcon icon={faFacebook} /></a>
                            <a href="#" className="social"><FontAwesomeIcon icon={faGoogle} /></a>
                            <a href="#" className="social"><FontAwesomeIcon icon={faTwitter} /></a>
                        </div>
                        <span>or use your account</span>
                        <input id="email" name="email" type="email" placeholder="Email" />
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

export default CreateSalePerson;
