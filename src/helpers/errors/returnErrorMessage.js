export const returnErrorMessage = (error) => {
    if(error.hasOwnProperty("message")){
        return error.message
    }else if(error.hasOwnProperty("name")){
        return error.name
    }else{
        return JSON.stringify(error)
    }
}
