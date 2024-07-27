const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const addressSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        isDefault: false,
        tag: ''
    }
});

const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: Number,
        require: true,
        unique: true
    },
    countryCode: {
        type: String,
        required: true
    },
    address: {
        type: [addressSchema],
        require: false
    },
    password: {
        type: String,
        require: true
    }
});

customerSchema.pre('save', async function (next){
    try {
        if(this.isModified('password')){ 
            this.password = await bcrypt.hash(this.password, 15);
        }
        next();
    } catch (error) {
        console.log(error);
        // next(error);
    }
});

customerSchema.methods.verifyPass = async function(pass) {
    try {
        return await bcrypt.compare(pass, this.password);
    } catch (error) {
        console.log('Error in checkPass:\n',error);
        // next(error);
    }
}

customerSchema.methods.generateToken = function() {
    try {
        return jwt.sign({
            userID: this._id.toString(),
            email: this.email
        },
        process.env.JWT_TOKEN,
        {
            expiresIn: '1D'
        });
    } catch (error) {
        console.log('Error in customer model: ',error);
    }
}

const User = new mongoose.model('customers', customerSchema, 'customers');

module.exports = User;