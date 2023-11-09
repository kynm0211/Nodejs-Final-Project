const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const package = require('../middlewares/package');
const requiredLogin = require('../middlewares/requiredLogin');

module.exports = (app) => {
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
