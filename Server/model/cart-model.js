const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
})

const cartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers',
        require: true
    },
    curCart: {
        type: [itemSchema],
        require: false
    },
    forLater: {
        type: [itemSchema],
        require: false
    }
});

const Cart = new mongoose.model('carts', cartSchema, 'carts');

module.exports = Cart;