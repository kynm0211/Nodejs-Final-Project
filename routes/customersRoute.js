const package = require('../middlewares/package');
const requiredLogin = require('../middlewares/requiredLogin');
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const Order = mongoose.model('Order');
module.exports = (app) => {

    app.get('/api/customers', requiredLogin, async (req, res)=>{
        try{
            const customers = await Customer.find({}).lean();
            const endCustomers = [...customers]; // Now, it creates a shallow copy of the array

            // Delete password from endCustomers
            for (let i = 0; i < endCustomers.length; i++) {
                delete endCustomers[i].password;
            }

            console.log(endCustomers);
            return res.json(package(0, 'Success', endCustomers));
        }
        catch(err){
            return res.send(
                package(0, 'An error occurred while fetching customers.', err.message)
            )
        }
    });

    app.get('/api/customers/:id',requiredLogin ,async (req, res) => {
        try{
            const id = req.params.id;
            const customer = await Customer.findById(id).lean();
            if(!customer) return res.send(package(1, 'Customer not found'));
            delete customer.password;


            return res.json(package(0, 'Success', customer));
        }catch(err){
            return res.send(package(1, 'An error occurred while fetching customer.', err.message));
        }
    });

    app.get('/api/customers/:id/transactions',requiredLogin, async (req, res) => {
        try{
            const id = req.params.id;

            const customer = await Customer.findById(id).lean();

            if(!customer) return res.send(package(1, 'Customer not found'));

            const transactions = await Order.find({customer_id: id}).lean();

            if(!transactions) return res.send(package(1, 'No transactions found'));


            const data = {
                customer: customer,
                transactions: transactions
            }

            return res.json(package(0, 'Success', data));
        }
        catch(err){
            return res.send(package(1, 'An error occurred while fetching transactions.', err.message));
        }
        
    });
}