const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const Order = mongoose.model('Order');
const OrderDetail = mongoose.model('OrderDetail');
const Product = mongoose.model('Product');
const bodyParser = require('body-parser');
const package = require('../middlewares/package');
const hashPassword = require('../service/hash256');
const KEY = require('../config/key');
const jwt = require('jsonwebtoken');
module.exports = (app) => {
    app.use(bodyParser.json());

    app.post('/api/create-customer',async (req, res) => {
        const user = req.body;
        return res.send(createCustomer(user));
    });

    // Find the user in db
    app.get('/api/find-customer/:phone',async (req, res) => {
        const phone = req.params.phone;
        const result = await findCustomer(phone);
        return res.send(result);
    });

    // Find order detail by order_number
    app.get('/api/find-order-detail/:order_number',async (req, res) => {
        const order_number = req.params.order_number;
        const result = await findOrderDetail(order_number);
        return res.send(result);
    });

    app.post('/api/add-order-detail',async (req, res) => {
        const orderDetail = req.body;
        orderDetail.products = JSON.parse(orderDetail.products);
        console.log(orderDetail);
        const newOrderDetail = new OrderDetail(orderDetail);
        try{
            await newOrderDetail.save();
        }catch(err){
            console.log(err);
        }
        return res.send('ok');
    });


    app.post('/api/create-a-bill',async (req,res)=>{
        try{
            // Get data from client and Extract properties from req.body
            let getCustomer = req.body.customer;
            let getCart = req.body.cart;
            let getToken = req.body.token;
            let taxrate = req.body.taxrate;

            getCustomer = JSON.parse(getCustomer);
            getCart = JSON.parse(getCart);
            let paymentMethod = getCustomer.paymentMethod;



            // Validate data
        
            // Customer session
            let customer = await findCustomer(getCustomer.phone);
            if(customer.code !== 0){
                if(getCustomer.name.length > 0 && getCustomer.address.length > 0 && getCustomer.phone.length > 6){
                    let doCreate = await createCustomer(getCustomer);
                    if(doCreate.code === 0){
                        customer = doCreate;
                    }
                }else{
                    return res.send(
                        package(403, 'The data of the customer is not ok', null)
                    );
                }
            }
            delete customer.data.password;
            customer = customer.data;


            // Cart session
            let cart = await pullProducts(getCart);
            
            // Staff session
            let staff = await verifyStaff(getToken);
            
            if(cart.code !== 0){
                return res.send(package(403, 'The products are not valid', null));
            }
            if(staff.code !== 0){
                return res.send(package(403, 'The staff is not valid', null));
            }

            staff = staff.data;
            cart = cart.data;

            // Start calulating
            const { count, sub_total } = cart.reduce(
                (accumulator, item) => {
                    accumulator.count += item.amount;
                    accumulator.sub_total += item.retail_price * item.amount;
                    return accumulator;
                },
                { count: 0, sub_total: 0 }
            );
        

            const taxfee = (sub_total * taxrate) / 100;
            const total = sub_total + taxfee;
            const order_number = new Date().getTime().toString();
            console.log(taxfee);
            // End calulating

            // Create order
            
            const order = {
                customer_id: customer._id,
                staff_id: staff._id,
                order_number: order_number,
                taxrate: taxrate,
                taxfee: taxfee,
                sub_total: sub_total,
                total: total,
                quantity: count,
                paymentMethod: paymentMethod,
                created_date: new Date(),

            }
            const newOrder = new Order(order);
            const createdOrder = await newOrder.save();

            // Create order detail
            const orderDetail = {
                order_id: createdOrder._id,
                order_number: createdOrder.order_number,
                products: cart,
            }
            const newOrderDetail = new OrderDetail(orderDetail);
            await newOrderDetail.save();

            return res.send(
                package(0, 'Create bill successfully', createdOrder)
            )

            
        }catch(err){
            return res.send(
                package(500, 'Server error', err.message)
            );
        }
    });


    // Sub Functions
    const findCustomer = async (phone) =>{
        if(phone.length < 8 || phone.length > 11){
            return package(403, 'This phone number is invalid', null) 
        }
        // Find customer in db 
        try{
            const customer = await Customer.findOne({phone});

            if(!customer){
                return package(404, 'Customer does not exist in the system', null)
            }
            const prepairCustomer = {...customer._doc};
            delete prepairCustomer.password;
            return package(0, 'Customer found', prepairCustomer)
            
        }catch(err){
            return package(500, 'Server error', null)
        }
    }

    const createCustomer = async (customer) =>{

        customer.password = hashPassword(customer.phone, KEY.SECRET_SALT);

        const newUser = new Customer(customer);
        try{
            await newUser.save();
            return package(0, 'Create customer successfully', newUser)

        }catch(err){
            return  package(403, 'The data of the customer is not ok', null)
            
        }
    }

    const pullProducts = async (cart) => {
        const tempCart = [];
        for(let i = 0; i < cart.length; i++){
            const id = cart[i]._id;
            const amount = cart[i].amount;
            try{
                const product = await Product.findById(id);
                if(!product){
                    continue;
                }
                if(product.quanity < amount){
                    return package(1, 'The amount of the product is not enough', null);
                }
                product.quanity -= amount;
                product.purchase = true;
                await product.save();
                
                const productCart = {
                    _id: product._id,
                    barcode: product.barcode,
                    name: product.name,
                    amount: amount,
                    retail_price: product.retail_price,
                }
                tempCart.push(productCart);
            }catch(err){
                return package(501, 'Error happens at cart', err.message);
            }
        }
        return package(0, 'Success', tempCart);
    }

    const verifyStaff = async (token) => {
        try{
            const isUser = jwt.verify(token, KEY.SECRET_SESSION_KEY, (err, user) => {
                if (err) {
                    return package(403, 'Access denied', null)
                }
                return package(0, 'Success', user);
            });
            return isUser;
        }catch(err){
            if (err.name === 'TokenExpiredError') {
                return package(403, 'Token has expired', null);
            } else {
                return package(403, 'Access denied', null);
            }
        }

        
    }

    const findOrderDetail = async (order_number) => {
        try{
            const orderDetail = await OrderDetail.findOne({order_number});
            if(!orderDetail){
                return package(404, 'Order detail does not exist in the system', null);
            }
            return package(0, 'Success', orderDetail);
        }catch(err){
            return package(500, 'Server error', err.message);
        }
    }
}
