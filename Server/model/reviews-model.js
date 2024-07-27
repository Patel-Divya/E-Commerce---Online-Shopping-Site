const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers',
        require: true
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        require: true
    },
    rating: {
        type: Number,
        min: 1,
        require: false
    },
    review: {
        type: String,
        require: false
    },
    title: {
        type: String,
        require: false
    },
    image: {
        type: Image,
        require: false
    }
});

const Review = new mongoose.model('reviews',reviewSchema, 'reviews');

module.exports = Review;