import { useState, useEffect } from "react";
function CustomerTab() {
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState(0);

    useEffect(()=>{
        console.log(phone);
        console.log(name);
        console.log(address);
        console.log(paymentMethod);
    
    }, [phone, name, address, paymentMethod])

    /*
        0: COD
        1: Visa/Credit
        2: Momo
        3: VNPay
    */
    return ( 
        <div>
            <div className="text-center">
                <h3>Filling Information of Customer</h3>
            </div>
            <div className="my-5">
                <div class="row">
                    <div class="col">
                        <label>Phone number</label>
                        <input
                            type="text"
                            class="form-control"
                            id="phone" placeholder="Enter phone's customer"
                            name="phone"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <button className="my-2 btn btn-primary">Checkout <i class="fa-solid fa-check-to-slot"></i></button>
                    </div>
                    <div class="col">
                        <label >Full of name</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Enter customer's name"
                            name="fullname"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row my-2">
                    <div class="col">
                        <label >Address</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Enter customer's address"
                            name="address"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </div>
                <div class="form-group mt-5">
                    <label for="sel1">Payment method:</label>
                    <select class="form-control" id="paymethod" onChange={(e) => {
                        setPaymentMethod(e.target.value);
                    }}>
                        <option value={0}>COD (Cash only)</option>
                        <option value={1}>Visa/Credit Card</option>
                        <option value={2}>Momo</option>
                        <option value={3}>VN Pay</option>
                    </select>
                </div>
                <div className="text-center my-4">
                    <button className="btn btn-primary mx-2">Confirm</button>
                    <button className="btn btn-warning mx-2">Edit</button>
                </div>
            </div>
        </div>
    );
}

export default CustomerTab;