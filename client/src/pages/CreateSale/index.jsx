import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import './CreateSale.css';
export const CreateSale = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const [created, setCreated] = useState(false);
    const [loading, setLoading] = useState(false);

    const [error, setErorr] = useState(null);
    function handleRegister(event) {
        event.preventDefault();
        setLoading(true);
        setErorr(null);
        setCreated(false);


        const userData = {
            name: name,
            email: email
        };

        axios.post('/api/admin/create-account-sale', userData)
            .then(response => {
                const res = response.data;
                if (res.code === 0) {
                    const user = res.data;
                    setUsername(user.username);
                    setCreated(true);
                } else {
                    setErorr(res.message);
                }
                setLoading(false);
            })
            .catch(error => {
                setErorr(error);
                setLoading(true);
            });
    }
    return (
        <section>
            <div className="card">
                <div className="card-header text-center bg-info text-white">
                    <h3>CREATE ACCOUNT FOR SALER</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="alert alert-primary">
                                <strong>Notice!</strong>
                                <br />
                                The username will create automatically by the system base on the name of the email address!!!
                                <br/>
                                For example: <strong>abc@gmail.com</strong> -> <strong>abc</strong>
                                <br/>
                                And default password is the same as <strong>abc</strong>
                                <br/>
                                For instance: username = <strong>abc</strong> and password = <strong>abc</strong> 
                                
                            </div>
                            <div className="alert alert-warning">
                                <strong>Warning!</strong>
                                <br />
                                After creating account, there is an email will be sent to the saler's email address to confirm the account.
                            </div>
                            {created && <div className="alert alert-success">
                                <strong>Success!</strong>
                                <br />
                                The account was successfully created. Please check the email to confirm the account.
                                <br/>
                                Username: <strong>{username}</strong> and Password: <strong>{username}</strong>
                            </div>}
                        </div>
                        <div className="col-md-6">
                            <form className="was-validated">
                                <div className="form-group">
                                    <label>Email address:</label>
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        type="text"
                                        className="form-control"
                                        id="email" placeholder="Enter email"
                                        name="email"
                                        required />
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">Please fill out this field.</div>
                                </div>
                                <div className="form-group">
                                    <label>Full of name:</label>
                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        type="text"
                                        className="form-control"
                                        id="name" placeholder="Enter fullname of the saler"
                                        name="name" required />
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">Please fill out this field.</div>
                                </div>
                                <button className="btn btn-primary" onClick={handleRegister} disabled={loading}>Create</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    {/* Loading */}
                    {loading && <div className="text-center">
                        <img src="https://firebasestorage.googleapis.com/v0/b/nodejs-final-8bdf4.appspot.com/o/Dual%20Ring-1s-200px.gif?alt=media&token=1b30beed-915f-4d8d-b44e-e00514500cb4&_gl=1*4r51lr*_ga*NzkyMjQ3NDYxLjE2OTY5MjkyODU.*_ga_CW55HF8NVT*MTY5NzM4MzM4NS43LjEuMTY5NzM4NDE3OC40OS4wLjA."
                            width={50}
                        />
                    </div>}
                    {/* Show error message */}
                    {error && <div className="alert alert-danger">
                        <strong>Error!</strong> {error}
                    </div>}
                </div>
            </div>
        </section>
    );
}


export default CreateSale;
