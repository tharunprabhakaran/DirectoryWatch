/**
 * @name FetchGlobalConstantsAPI
 * @description Retrives Global Constants reports
 * @param {Request} Request
 * @param {Response} Respone
 * @param {nedb} DB
 * @version 1.0
 * @author tharun_p
 */

/* Import */
var DatabaseUtils = require('../../utils/DB/DB')

let FetchGlobalConstantsAPI = async function (Request, Response, DB) {

    try {
        
        let queryResponse =  await DatabaseUtils.fetchGlobalConstants()

        /* Handle Database error */
        if (queryResponse.error) {
            throw { "error": queryResponse.error, "errorCode": "FGC1001", "description": "Error in Database fetch", "type": "GlobalConstantInternalError"}
        }

        /* Send Response */
        Response.json(queryResponse.data)

    } catch (error) {
        console.log(error)
        if(error.type == "GlobalConstantInternalError"){
            Response.statusCode = 500
            Response.json(error)
        }else{
            errorResponse = {"error": error, "errorCode": "FW1000", "description": "Generic Error in FetchWatch", "type": "UnexpectedError"}
            Response.statusCode = 500
            Response.json(errorResponse)
        }
       
        
    }

}

/* Export */
module.exports = FetchGlobalConstantsAPI