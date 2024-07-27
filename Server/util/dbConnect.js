const mongoose = require('mongoose');
const dbURL = process.env.Local_DB_URL;
//const dbURL = process.env.DB_URL;

const connectDB = async ()=> {
    try {
        await mongoose.connect(dbURL);
        console.log('DB connection successfull');
    } catch (error) {
        console.log('Error in /util/dbCOnnect: ',error);
    }
}

module.exports = connectDB;