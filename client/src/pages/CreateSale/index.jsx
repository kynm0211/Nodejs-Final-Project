import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import './CreateSale.css';
export const CreateSale = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");    

    function handleRegister(event) {
        event.preventDefault();

        if (!name || !email || !role) {
            console.error("Please provide all required information.");
            return;
        }

        const userData = {
            name: name,
            email: email,
            role: role
        };

        axios.post('/api/admin/create-account-sale', userData)
            .then(response => {
                const res = response.data;
                console.log(res.data)
                if (res.code === 0) {
                    const token = res.data.token;
                    localStorage.setItem('token', token);
                } else {
                    console.error(res.message);
                }
            })
            .catch(error => {
                console.error('Registration failed', error);
            });
    }

    return (
        <div id="bodyLogin">
            <div className={`container right-panel-active`} id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={handleRegister}>
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social"><FontAwesomeIcon icon={faFacebook} /></a>
                            <a href="#" className="social"><FontAwesomeIcon icon={faGoogle} /></a>
                            <a href="#" className="social"><FontAwesomeIcon icon={faTwitter} /></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            type="text"
                            placeholder="Name"
                            id="name"
                        />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            type="email"
                            placeholder="Email"
                            id="email"
                        />
                        <div class="radio-buttons">
                            <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    id="administrator"
                                    name="role"
                                    value="administrator"
                                    checked={role === "administrator"}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                <label class="form-check-label" for="administrator">Admin</label>
                            </div>

                            <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    id="sale"
                                    name="role"
                                    value="sale"
                                    checked={role === "sale"}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                <label class="form-check-label" for="sale">Sale</label>
                            </div>

                            <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    id="customer"
                                    name="role"
                                    value="customer"
                                    checked={role === "customer"}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                <label class="form-check-label" for="customer">Customer</label>
                            </div>
                        </div>



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
    );
}


export default CreateSale;
