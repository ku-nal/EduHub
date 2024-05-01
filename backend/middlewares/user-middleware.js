const {StatusCodes} = require('http-status-codes');
const ErrorResponse = require('../utils/common/ErrorResponse');

function validateCreateUserRequest(req, res, next){
    console.log(req.body);
    if(!req.body.firstName){
        ErrorResponse.message = "First name is required in the request body";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.lastName){
        ErrorResponse.message = "Last name is required in the request body";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.email){
        ErrorResponse.message = "Email is required in the request body";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.password){
        ErrorResponse.message = "Password is required in the request body";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}

module.exports = {
    validateCreateUserRequest
}