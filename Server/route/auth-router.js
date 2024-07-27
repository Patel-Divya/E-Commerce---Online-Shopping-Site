const express = require('express');
const router = express.Router();
const authController = require('../controller/auth-controller');
const validate = require('../middleware/auth-validate-midddleware');
const {signupSchema, loginSchema, addressSchema, addressInfoSchema, passwordSchema, resetPassSchema} = require('../validators/auth-validator');
const authUser = require('../middleware/auth-middleware');

router.route('/register').post(validate(signupSchema), authController.signup);
router.route('/login').post(validate(loginSchema), authController.login);
router.route('/pass/update').patch(authUser, validate(passwordSchema), authController.updatePass);  // work done but no response on frontend
router.route('/pass/reset').post(validate(resetPassSchema));  // work pending
router.route('/user').get(authUser, authController.user);
router.route('/address/new').post(authUser);  // work pending
router.route('/address/delete').delete(authUser);  // work pending

module.exports = router;