/***
 * @name DirectoryWatch
 * @description Utility to monitor changes in a given directory and count the occurance of mentioned string
 * @version 1.0
 * @author tharun_p
*/

/* Imports */
var express = require("express")
var DatabaseUtils = require('./utils/DB/DB')
var cron = require('./utils/CronJob/Cronjob')

/* Modules Import */
let FetchWatchAPI = require('./api/fetchWatchAPI/fetchWatchAPI')
let fetchGlobalConstantsAPI = require('./api/fetchGlobalConstantsAPI/fetchGlobalConstantsAPI')
let updateGlobalConstantsAPI = require('./api/modifyGlobalConstantsAPI/modifyGlobalConstantsAPI')


/* Initialisation */
var app = express()
const PORT = process.env.PORT || 4000

/* Initiate Cron Job for Every 1 min */
cron.newjob(1)

/* Middlewares */
app.use(express.json())

/* Server Startup */
app.listen(PORT, ()=>{
    console.log(`Server Started at PORT -> ${PORT}`)
})

/* Services */

/**
 * @name Fetch Watch Details
 * @description Used to fetch the details about the watch batch
 * @argument Fetch Query Parameters
 * @returns JSON
 */
app.get('/Watch', (Request, Response) => {
    var FetchWatchCall = FetchWatchAPI(Request, Response, DatabaseUtils)
})

/**
 * @name Modify Global Constants
 * @description used to Modify the watch batch parameters
 * @argument Modify Parameters
 * @return JSON
 */
app.put('/constants', (Request, Response) => {
   var updateGlobalConstantsAPIResponse =  updateGlobalConstantsAPI(Request, Response, DatabaseUtils)
})

/**
 * @name Fetch Global Constants
 * @description Retrives global constants
 * @argument Modify Parameters
 * @return JSON
 */
app.get('/constants', (Request, Response) => {
    var fetchGlobalConstantsAPIResponse = fetchGlobalConstantsAPI(Request, Response, DatabaseUtils)
})



