exports.errorHandler = (error, req, res, next) => {
    const status = error.status;
    const message = error.message;
    const data = error.data;

    res.status(status).json({message, data});
}