const errorMiddleware = (err, req,res, next) => {
    const status = err.status || 500
    const message = err.message || 'Server Error';

    console.log('Error middleware error recieved: \n',err);
    return res.status(status).json({message});
}

module.exports = errorMiddleware;