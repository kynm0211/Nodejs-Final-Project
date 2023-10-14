import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

export const CreateSale = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");    
    

    function handleRegister(event) {
        event.preventDefault();

        // Kiểm tra và xử lý lỗi ở đây nếu cần
        if (email.length < 1) {
            console.error("Please provide your email!");
            return;
        }

        const userData = new FormData();
        userData.append('name', name);
        userData.append('email', email);
        userData.append('role', role);  

        // Gửi yêu cầu POST đến máy chủ
        axios.post('/api/admin/create-account-sale', userData)
            .then(response => {
                const res = response.data;
                if (res.code === 0) {
                    // Đăng ký thành công
                    const token = res.data.token;
                    localStorage.setItem('token', token);
                    window.location.href = '/';
                } else {
                    // Xử lý lỗi nếu đăng ký không thành công
                    console.error(res.message);
                }
            })
            .catch(error => {
                console.error('Đăng ký thất bại', error);
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
                            name="nameR"
                            type="text"
                            placeholder="Name"
                        />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="emailR"
                            type="email"
                            placeholder="Email"
                        />
                        <input
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            name="roleR"
                            type="text"
                            placeholder="Role"
                        />
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
