/**
 * @name modifyGlobalConstantsAPI
 * @description Updates Global Constants Parameters
 * @param {Request} Request
 * @param {Response} Respone
 * @param {nedb} DB
 * @version 1.0
 * @author tharun_p
*/

/* Import */
var DatabaseUtils = require('../../utils/DB/DB')
var cron = require('../../utils/CronJob/Cronjob')
let modifyGlobalConstantsAPI = async function (Request, Response, DB) {

    try {
        let data = Request.body
        var updateGlobalConstant = await DatabaseUtils.updateGlobalConstants(data)
        
        if(data.frequency){
            cron.newjob(data.frequency)
        }

        if (updateGlobalConstant.error) {
            throw { "error": updateGlobalConstant.error, "errorCode": "MGC1001", "description": "Error in Database fetch", "type": "modifyGlobalConstant" }
        }

        let responeObject = {
            "error": null,
            "updateRecords": updateGlobalConstant.data
        }

        /* Send Response */
        Response.json(responeObject)

    } catch (error) {

        if (error.type == "modifyGlobalConstant") {
            Response.statusCode = 500
            let responeObject = {
                "error": error,
                "updateRecords": null
            }
            Response.json(responeObject)

        } else {
            errorResponse = { "error": error, "errorCode": "MGC1000", "description": "Generic Error in modifyGlobalConstant", "type": "UnexpectedError" }
            Response.statusCode = 500
            let responeObject = {
                "error": errorResponse,
                "updateRecords": null
            }
            Response.json(responeObject)


        }
    }


}

/* Export */
module.exports = modifyGlobalConstantsAPI