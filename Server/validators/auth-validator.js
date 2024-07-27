const {z} = require('zod');

const resetPassSchema = z.object({
    new_password: z
    .string({required_error: 'Please enter your new password'})
    .trim()
    .min(8, {message: 'Password must be of atleast 8 chars'})
    .max(1024, {message: 'Password cannot be more than 1024 chars'}),

    confirm_password: z
    .string({required_error: 'Please repeat your new password'})
    .trim()
    .min(8, {message: 'Password must be of atleast 8 chars'})
    .max(1024, {message: 'Password cannot be more than 1024 chars'}),
});

const passwordSchema = resetPassSchema.extend({
    password: z
    .string({required_error: 'Please enter your old password'})
    .trim(),
});

const loginSchema = z.object({
    email: z
    .string({required_error: 'Email is required'})
    .trim()
    .min(7, {message: 'Email should be of atleast 7 chars'}),

    password: z
    .string({required_error: 'Enter the password first'})
    .trim()
});

const signupSchema = loginSchema.extend({
    phone: z
    .number({required_error: 'Phone is required'})
    .min(1000000000, {message: 'Phone number should be of 10 numbers'})
    .max(9999999999, {message: 'Phone number should be of 10 numbers'}),
    
    countryCode: z
    .string({required_error: 'Please select country code'})
    .trim(),

    password: z
    .string({required_error: 'Enter the password first'})
    .trim()
    .min(8, {message: 'Password must be of atleast 8 chars'})
    .max(1024, {message: 'Password cannot be more than 1024 chars'}),

    username: z
    .string({required_error: 'Please provide username'})
    .trim()
    .min(3, {message: 'Username must be of atleast 3 chars'})
    .max(255, {message: 'Username cannot be more than 255 chars'})
});

const addressSchema = z.object({
   addressline1: z
   .string({required_error: 'Please provide the Flat, House no, Building, Company or Apartment name'})
   .trim()
   .min(5, {message: 'Fleild 1 shouldd contain atleast 5 chars'})
   .max(255, {message: 'Field 1 cannot have more than 255 chars'}),

   addressline2: z
   .string({required_error: 'Please provide the area, street, sector or village info'})
   .trim()
   .min(5, {message: 'Fleild 2 shouldd contain atleast 5 chars'})
   .max(255, {message: 'Field 2 cannot have more than 255 chars'}),

   landmark: z
   .string({required_error: 'Please provide the landmark of your area'})
   .trim(),

   pincode: z
   .number({required_error: 'Please provide the pincode'})
   .min(6, {message: 'Pincode must be of atleast 6 digits'})
   .max(6, {message: 'Pincode cannot be of morethan 6 digits'}),

   city: z
   .string({required_error: 'Please provide Town/City name'})
   .trim()
   .min(3, {message: 'Please enter a valid Town/City name'})
   .max(255, {message: 'Please enter a valid Town/City name'}),

    state: z
    .string((state)=>{
        if(state.trim() == 'State' || state.trim() == 'State')
            return {message: 'Please provide the state'}
    })
    .trim()
});

const addressInfoSchema = z.object({
    country: z
    .string({required_error: 'Please select the country'})
    .trim(),

    name: z
    .string({required_error: "Please provide reciever's name"})
    .trim()
    .min(3, {message: 'Name must be of atleast 3 chars'})
    .max(255, {message: 'Name cannot be more than 255 chars'}),

    phone: z
    .string({required_error: 'Phone is required'})
    .trim()
    .min(10, {message: 'Phone number should be of 10 numbers'})
    .max(10, {message: 'Phone number should be of 10 numbers'}),

    address: z
    .string({required_error: 'Please provide the address'})
    .trim()
});

module.exports = {
    loginSchema, 
    signupSchema, 
    addressSchema, 
    addressInfoSchema, 
    resetPassSchema, 
    passwordSchema
}