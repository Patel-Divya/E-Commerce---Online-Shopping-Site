const customer = require('../model/customer-model');

const signup = async (req, res, next) => {
    try {
        const {username, email, phone, password, countryCode} = req.body;

        if(!checkUsername(username)) return next({message: 'Username must contain only alphabets'});
        else if(!checkEmail(email)) return next({message: 'Please enter a valid email'});
        else if(!checkPass(password)) return next({message: 'Password must contain atleast one Alphanumeric and special charectors'});

        else{
            const emailExists = await customer.findOne({email});
            const phoneExists = await customer.findOne({phone});
            // console.log(emailExists, phoneExists);

            if(!emailExists && !phoneExists){
                const userCreated = await customer.create({
                    username, email, phone, password, countryCode
                });
                // console.log('User created:', userCreated);

                return res.status(200).json({
                    message: 'Signup successfull',
                    status: true
                });
            }else{
                const status = 400;
                if(emailExists) return next({status: status, message: 'Email already exists'});
                else if(phoneExists) return next({status: status, message: 'Phone number already exists'});
                else return next({ status: 400, message: 'User already exists' });
            }
        }
    } catch (error) {
        console.log('Error in signup auth-controller:\n',error);
    }
}

const login = async (req, res, next) =>{
    try {
        const {email, password} = req.body;

        if(!checkEmail(email)) return next({message: 'Please enter a valid email'});

        const userExists = await customer.findOne({email});
        
        if(userExists){
            if(await userExists.verifyPass(password)){
                return res.status(200).json({
                    message: 'Login successfull',
                    token: userExists.generateToken(),
                    userID: userExists._id.toString()
                });
            }else{
                return next({
                    status: 400,
                    message: 'Incorrect email or password'
                });
            }
        }else{
            return res.status(400).json({message: 'Incorrect email or password'});
        }        
    } catch (error) {
        console.log('Error in login auth-controller:\n', error);
    }
}

const user = async (req, res, next) =>{
    try {
        const userData = req.user;
        return res.status(200).json({userData});
    } catch (error) {
        console.log('Error in user auth-controller\n', error);
        return next({message: 'Unnable to fetch data'});
    }
}

const checkUsername = (username) => {
    const userRegex = /^[A-Za-z ]+$/;
    return userRegex.test(username);
}

const checkEmail = (email) =>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email);
}

const checkPass = (pass) => {
    const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).+$/;

    return passRegex.test(pass);
}

const updatePass = async (req, res, next) => {
    try {
        const {password, new_password, confirm_password} = req.body;
        const userID = req.userID;
        const user = await customer.findOne({_id : userID});
        // console.log(`User: ${user},oldpass:${password}, newpass: ${new_password}, conf_pass: ${confirm_password}`);

        if(!password || !new_password || !confirm_password) return next({message: 'Please fill all fiels'});
        
        if(new_password != confirm_password) return next({message: 'Please repeat the new password correctly'});

        const isMatch = await user.verifyPass(password);
        
        if(!isMatch) return next({message: 'Password incorrect'});

        user.password = new_password;        
        await user.save();

        return res.status(200).json({message: 'Password changed successfully'});
    } catch (error) {
        console.log('Error in updatePass auth-controller:\n', error);
    }
}

module.exports = {signup, login, user, updatePass};