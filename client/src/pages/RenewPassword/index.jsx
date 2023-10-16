import { useState } from "react";
import axios from "axios";

function RenewPassword() {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState(null);
    const [repassword, setRepassword] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        if (password !== repassword) {
            setError("Password and Re-Password not match");
            return;
        }
        if(!password || !repassword) {
            setError("Password and Re-Password can not be empty");
            return;
        }
        handleChangePassword();
    }

    const handleChangePassword = () =>{
        setLoading(true);
        const token = localStorage.getItem('token');
        const data = {
            password: password,
        };
        axios.put('/api/renew-password', data, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`
            }
        })
            .then(response => {
                const res = response.data;
                console.log(res.data);
                if (res.code === 0) {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                } else {
                    setError(res.message);
                }
                setLoading(false);
        })
          .catch(error => {
            setError(error);
            setLoading(false);
        });
    }
    return ( 
        <div>
            <div className="row p-0 m-0 d-flex align-items-center" style={{height: '100vh'}}>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div class="card">
                        <div class="card-header text-center text-white bg-secondary p-3">
                            <h3>CHANGE YOUR PASSWORD</h3>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input 
                                        type="password" 
                                        class="form-control"
                                        id="password_txt" 
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    required/>
                                </div>
                                <div class="form-group">
                                    <label>Password Confirm</label>
                                    <input 
                                        type="password" 
                                        class="form-control" 
                                        id="confirm_password" 
                                        placeholder="Re-Password"
                                        onChange={(e) => setRepassword(e.target.value)}
                                    required/>
                                </div>
                            </form>
                            <div className="text-center">
                                <a href="/logout" className="btn btn-warning m-1">Logout</a>
                                <button disabled={loading} type="submit" className="btn btn-primary m-1" onClick={(e) => handleSubmit(e)}>Submit</button>
                            </div>
                        </div>
                        <div class="card-footer">
                            {loading && <div className="text-center">
                            <img src="https://firebasestorage.googleapis.com/v0/b/nodejs-final-8bdf4.appspot.com/o/Dual%20Ring-1s-200px.gif?alt=media&token=1b30beed-915f-4d8d-b44e-e00514500cb4&_gl=1*4r51lr*_ga*NzkyMjQ3NDYxLjE2OTY5MjkyODU.*_ga_CW55HF8NVT*MTY5NzM4MzM4NS43LjEuMTY5NzM4NDE3OC40OS4wLjA."
                                width={50}
                            /></div>} 
                            {error && <div class="alert alert-danger">
                                <strong>Error!</strong> { error}
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="col-md-4"></div></div>
        </div>
    );
}

export default RenewPassword;