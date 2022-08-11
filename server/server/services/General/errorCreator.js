function createNewErrorFromDatabaseError(error){
    let newError;
    switch(error.type){
        case "notnull violation":
            newError =  createError("Some value is with null", 400);
            break;
        case "string violation":
            newError = createError("Wrong type of paramter entered", 400);
            break;
        case  "unique violation":
            newError = createError("Trying to enter unique value that already exists", 400);
            break;
        case "validation error":
            newError = createError("The params didnt match there fields", 4004);
            break;
        default:
            newError = createError("Something went wrong", 400);
    }
    return newError;
}

function createError(message, statusCode){
    const error = Error(message);
    error.statusCode = statusCode;
    return error;
}

module.exports = {
    createNewErrorFromDatabaseError,
    createError
};