const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        require: true
    },
    brand: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    available: {
        type: Number,
        require: true
    },
    category: {
        type: Array,
        require: true
    },
    seller: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image:{
        type: Image,
        require: true
    }
});

const Product = new mongoose.model('products',productSchema,'products');

module.exports = Product;