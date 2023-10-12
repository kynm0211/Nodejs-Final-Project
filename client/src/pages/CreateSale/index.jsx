import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

export const CreateSale = (props) => {
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
                if (res.code === 0) {
                    const token = res.data.token;
                    localStorage.setItem('token', token);
                    window.location.href = '/';
                } else {
                    console.log(res);
                }
            })
            .catch(error => {
                console.error('Đăng ký thất bại', error);
            });
    }

    return (
        <div id="bodyLogin">
            <div className="container right-panel-active" id="container">
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
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>ADMIN ONLY!</h1>
                            <p>Create sale person account <br />Note: With email: 'example@gmail.com' and the username will be: 'example'</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateSale;
