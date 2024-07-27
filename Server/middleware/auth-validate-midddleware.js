const { parseAsync } = require('../validators/auth-validator');

const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);

        req.body = parseBody;
        
        next();
    } catch (error) {
        console.log('Error in auth-validate-middleware:\n', error);
        return next({status: 500, message: error.errors[0].message});
    }
}

module.exports = validate;