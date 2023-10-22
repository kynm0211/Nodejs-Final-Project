const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const package = require('../middlewares/package');
const requiredLogin = require('../middlewares/requiredLogin');

module.exports = (app) => {
    app.get('/api/product/:barcode', requiredLogin, async (req, res)=>{

        const barcode = req.params.barcode;

        if(!barcode){
            return res.json(package(404, "Product not found", null));
        }

        try {
            const product = await Product.findOne({ barcode });
            if (!product) {
              return res.json(
                package(404, "Product not found", null)
              );
            }
            return res.json(
              package(0, "Success", product)
            );
          } catch (err) {
            return res.json(
              package(404, "Error: Server error", null)
            );
          }          
    });
};