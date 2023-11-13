const Product = require('../models/ProductModel');
const package = require('../middlewares/package');
const requiredLogin = require('../middlewares/requiredLogin');

module.exports = (app) => {
    app.get('/api/products', requiredLogin, async (req, res) => {
        try {
            const products = await Product.find({});
            res.json(package(0, 'Success', products));
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'An error occurred while fetching products.' });
        }
    });
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

    app.put('/api/product/edit/:barcode', requiredLogin, async (req, res) => {
        const barcode = req.params.barcode;

        if (!barcode) {
            return res.json(package(404, "Product not found", null));
        }

        try {
            const updatedProduct = req.body; 

            
            const product = await Product.findOneAndUpdate({ barcode }, updatedProduct, { new: true });

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
                package(500, "Error: Server error", null)
            );
        }
    });

    app.delete('/api/product/delete/:barcode', requiredLogin, async (req, res) => {
        const barcode = req.params.barcode;

        if (!barcode) {
            return res.json(package(404, "Product not found", null));
        }

        try {
            const product = await Product.findOne({ barcode });

            if (!product) {
                return res.json(
                    package(404, "Product not found", null)
                );
            }
            if (product.purchase == true){
                return res.json(
                    package(2, "Product was purchased", null)
                );
            }

            await Product.findOneAndRemove({ barcode });

            return res.json(
                package(0, "Product deleted successfully", null)
            );
        } catch (err) {
            return res.json(
                package(500, "Error: Server error", null)
            );
        }
    });
};
