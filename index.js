/***
 * @name DirectoryWatch
 * @description Utility to monitor changes in a given directory and count the occurance of mentioned string
 * @version 1.0
 * @author tharun_p
*/

/* Imports */
var express = require("express")

/* Initialisation */
var app = express()
const PORT = process.env.PORT || 4000

/* Middlewares */

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
    Response.json("Fetch Watch API")
})

/**
 * @name Modify Watch Batch
 * @description used to Modify the watch batch parameters
 * @argument Modify Parameters
 * @return JSON
 */
app.put('/Watch', (Request, Response) => {
    Response.json("Modify Watch API")
})



