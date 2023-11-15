const mongoose = require('mongoose');
const ProductModel = mongoose.model('Product');
const bodyParser = require('body-parser');
const multer = require('multer');
const package = require('../middlewares/package');
const requiredLogin = require('../middlewares/requiredLogin');
const FormData = require('form-data');
const axios = require('axios');

const storage = multer.memoryStorage(); // Store image in memory
const upload = multer({ storage });

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.post('/api/product/add', requiredLogin, upload.single('image'), async (req, res) => {
    const product = req.body;
    const token = req.header('Authorization');

    if (!product || Object.keys(product).length === 0) {
      return res.json(
        package(404, "Product not found", null)
      );
    }

    let { barcode, quantity, name, import_price, retail_price, category, creation_date, description } = product;

    // Check all fields
    if (!barcode || !quantity || !name || !import_price || !retail_price || !category || !creation_date || !description) {
      return res.json(
        package(404, "Missing fields", null)
      );
    }

    // Remove all white space characters
    barcode = barcode.replace(/\s+/g, '');
    quantity = quantity.trim();
    name = name.trim();
    import_price = import_price.trim();
    retail_price = retail_price.trim();
    category = category.trim();
    creation_date = creation_date.trim();
    description = description.trim();

    if (barcode.length < 1 || quantity.length < 1 || name.length < 1 || import_price.length < 1 || retail_price.length < 1 || category.length < 1 || creation_date.length < 1 || description.length < 1) {
      return res.json(
        package(404, "The value should not be empty", null)
      );
    }

    if(import_price < 0 || retail_price < 0){
        return res.json(
            package(404, "Price should not be negative", null)
        );
    }

    if(quantity < 0){
        return res.json(
            package(404, "Quantity should not be negative", null)
        );
    }
    if(isNaN(quantity) || isNaN(import_price) || isNaN(retail_price)){
        return res.json(
            package(404, "Quantity, import price and retail price should be a number", null)
        );
    }

    if(import_price > retail_price){
        return res.json(
            package(404, "Import price should not be greater than retail price", null)
        );
    }

    const image = req.file; // Get the image from multer

    if (!image) {
      return res.json(
        package(404, "Missing image", null)
      );
    }

    //Check barcode existed
    const productExisted = await ProductModel.findOne({ barcode });
    if(productExisted){
        return res.json(
            package(404, "Barcode existed", null)
        );
    }
    
    // Handle the image upload
    const imageUrl = await handleUploadImg(image, token);
    if(!imageUrl) {
        return res.json(
            package(404, "Error uploading image", null)
        );
    }

    // Create a new product
    const newProduct = new ProductModel({
        barcode,
        quantity,
        name,
        import_price,
        retail_price,
        category,
        creation_date,
        description,
        image: imageUrl,
        purchase: false
    });

    // Save the product to the database
    
    try {
        await newProduct.save();
        return res.json(
            package(0, "Add product successfully", newProduct)
        );
    } catch (error) {
        return res.json(
            package(404, "Error adding product", null)
        );
    }

  });


  app.get('/api/products/:barcode', async (req, res) => {
    try {
        const barcode = req.params.barcode;
        const product = await ProductModel.findOne({ barcode }).lean();

        if (!product) {
            return res.json(
                package(404, "Product not found", null)
            );
        }

        return res.json(
            package(0, "Get product successfully", product)
        );
    } catch (error) {
        return res.json(
            package(404, "Error getting product", error.message)
        );
    }
    });

    app.patch('/api/products/:barcode', async (req, res) => {
        try {
            const barcode = req.params.barcode;
            const amount = req.body.amount;

            if(amount === undefined || amount === null || amount <= 0) {
                return res.json(
                    package(404, "Amount should be greater than 0", null)
                );
            } 
        
            const product = await ProductModel.findOneAndUpdate(
                { barcode },
                { $inc: { quantity: amount } }, // Use $inc to increment the existing quantity
                { new: true, lean: true } // Return the updated document as a plain JavaScript object
            );
        
            if (!product) {
                return res.json(
                    package(404, "Product not found", null)
                );
            }
        
            return res.json(
                package(0, "Update product successfully", product)
            );
        } catch (error) {
            return res.json(
                package(404, "Error updating product", error.message)
            );
        }        
    });

  const handleUploadImg = async (image, token) => {
    const imageData = new FormData();
    imageData.append("file", image.buffer, { filename: image.originalname });

    if (!image) return null;

    try {
        if(process.env.NODE_ENV !== 'production'){
            const response = await axios.post('http://localhost:5000/api/users/upload', imageData, {
                headers: {
                ...imageData.getHeaders(),
                'Authorization': token
                },
            });
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
    
            return response.data.data;
        }else{
            const response = await axios.post('/api/users/upload', imageData, {
                headers: {
                ...imageData.getHeaders(),
                'Authorization': token
                },
            });
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
    
            return response.data.data;
        }

    } catch (error) {
        return null;
    }
  };
}
