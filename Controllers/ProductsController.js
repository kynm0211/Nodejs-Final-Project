require('../models/ProductModel');
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const package = require('../middlewares/package');
module.exports = {
    index: async (req, res) =>{
        try{
            const pageSize = 10;
            const pageNumber = parseInt(req.query.page, 10) || 1;
            const skipAmount = (pageNumber - 1) * pageSize;

            const totalProducts = await Product.countDocuments({});
            const totalPages = Math.ceil(totalProducts / pageSize);

            const products = await Product.find({})
                .skip(skipAmount)
                .limit(pageSize)
                .lean();

            const data = {
                products: products,
                divider: totalPages,
            };
            
            res.json(package(0, "Success", data));
        }
        catch(err){
            res.send(
                package(403, err.message, null)
            )
        }
    },
    get: async (req, res) =>{
        try{
            const barcode = req.params.barcode;
            const product = await Product.findOne({ barcode }).lean();
    
            if (!product) {
                return res.json(
                    package(404, "Product not found", null)
                );
            }
    
            return res.json(
                package(0, "Get product successfully", product)
            );
        }
        catch(err){
            res.send(
                package(403, err.message, null)
            )
        }
    },
    edit: async (req, res) =>{
        try{
            const barcode = req.params.barcode;

            if (!barcode) {
            return res.json(package(404, "Product not found", null));
            }

            const updatedProduct = req.body;

            const product = await Product.findOneAndUpdate(
                { barcode },
                updatedProduct,
                { new: true }
            );

            if (!product) {
                return res.json(package(404, "Product not found", null));
            }

            return res.json(package(0, "Success", product));
        }
        catch(err){
            res.send(
                package(403, err.message, null)
            )
        }
    },
    delete: async (req, res) =>{
        try{
            const barcode = req.params.barcode;

            if (!barcode) {
              return res.json(package(404, "Product not found", null));
            }
            const product = await Product.findOne({ barcode });

            if (!product) {
            return res.json(package(404, "Product not found", null));
            }
            if (product.purchase == true) {
            return res.json(package(2, "Product was purchased", null));
            }

            const result = await Product.findOneAndRemove({ barcode });

            return res.json(package(0, "Product deleted successfully", result));
        }
        catch(err){
            res.send(
                package(403, err.message, null)
            )
        }
    }
}