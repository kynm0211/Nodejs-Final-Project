const Products = require('../models/ProductModel');
const package = require('../middlewares/package');
const requiredLogin = require('../middlewares/requiredLogin');

module.exports = (app) => {
    app.get('/api/products', requiredLogin, async (req, res) => {
        try {
            const products = await Products.find({});
            res.json(package(0, 'Success', products));
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'An error occurred while fetching products.' });
        }
    });
};
