/**
 * @name SchemaValidator
 * @description SchemaValidator is used to validate the Request JSON Payload for various Request
 * @version 1.0
 * @author tharun_p
 */

 /* Import Modules */
let fetchWatchValidator = require('./fetchWatchValidator')
let modifyWatchValidator = require('./modifyWatchValidtor')


/* Export Modules */
module.exports = {
    fetchWatchValidator,
    modifyWatchValidator
}