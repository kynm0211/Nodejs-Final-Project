const package = require('../middlewares/package');
const requiredLogin = require('../middlewares/requiredLogin');
const Customer = require('../models/CustomerModel');
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
}