/**
 * @name FetchWatchAPI
 * @description Retrives DirectoryWatch reports
 * @param {Request} Request
 * @param {Response} Respone
 * @param {nedb} DB
 * @version 1.0
 * @author tharun_p
 */

/* Import */
var DatabaseUtils = require('../../utils/DB/DB')

let FetchWatchAPI = async function (Request, Response, DB) {

    try {
        let queryCriteria = Request.query
        let queryResponse =  await DB.fetchDirectoryWatch(queryCriteria, DB.db)

        /* Handle Database error */
        if (queryResponse.error) {
            throw { "error": queryResponse.error, "errorCode": "FW1001", "description": "Error in Database fetch", "type": "DirectoryWatchInternalError"}
        }

        /* Send Response */
        Response.json(queryResponse.data)

    } catch (error) {
        console.log(error)
        if(error.type == "DirectoryWatchInternal"){
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
module.exports = FetchWatchAPI