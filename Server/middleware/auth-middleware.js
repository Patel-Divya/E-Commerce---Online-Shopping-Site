const jwt = require('jsonwebtoken');
const Customer = require('../model/customer-model');

const authUser = async (req, res, next) =>{
    const userToken = req.header('Authorization');

    if(!userToken) return next({message: 'Please login first'});

    const jwtToken = userToken.replace('Bearer','').trim();
    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_TOKEN);

        const userData = await Customer.findOne({_id: isVerified.userID, email: isVerified.email}).select({password: 0});
        if(userData){
            // console.log(userData);
            req.user = userData;
            req.token = jwtToken;
            req.userID = userData._id;
        }else{
            return next({message: 'User not found'});
        }
        next();
    } catch (error) {
        console.log('Error in auth-middelware:\n',error);
        return next({message: 'Unauthorized access'});
    }
    
    next();
}

module.exports = authUser;