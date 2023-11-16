const package = require('../middlewares/package');
const requiredLogin = require('../middlewares/requiredLogin');
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const Order = mongoose.model('Order');
module.exports = (app) => {

    app.get('/api/customers', requiredLogin, async (req, res) => {
        try {
            const pageSize = 10;
            const pageNumber = parseInt(req.query.page, 10) || 1;
            const skipAmount = (pageNumber - 1) * pageSize;

            const totalCustomers = await Customer.countDocuments({});
            const totalPages = Math.ceil(totalCustomers / pageSize);

            const customers = await Customer.find({})
                .skip(skipAmount)
                .limit(pageSize)
                .lean();

            const customersWithoutPassword = customers.map((customer) => {
                const { password, ...customerWithoutPassword } = customer;
                return customerWithoutPassword;
            });

            const data = {
                customers: customersWithoutPassword,
                divider: totalPages,
            };
            return res.json(package(0, 'Success', data));
        } catch (err) {
            return res.send(package(0, 'An error occurred while fetching customers.', err.message));
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

            const pageSize = 10;
            const pageNumber = parseInt(req.query.page, 10) || 1;
            const skipAmount = (pageNumber - 1) * pageSize;

            

            const customer = await Customer.findById(id).lean();

            if(!customer) return res.send(package(1, 'Customer not found'));

            const totalTransactions = await Order.countDocuments({customer_id: id});
            const transactions = await Order.find({customer_id: id}).lean()
                .skip(skipAmount)
                .limit(pageSize)
                .lean();

            if(!transactions) return res.send(package(1, 'No transactions found'));

            const totalPages = Math.ceil(totalTransactions / pageSize);

            const data = {
                customer: customer,
                transactions: transactions,
                divider: totalPages,
            }
            return res.json(package(0, 'Success', data));
        }
        catch(err){
            return res.send(package(1, 'An error occurred while fetching transactions.', err.message));
        }
        
    });
}