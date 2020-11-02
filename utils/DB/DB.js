/**
 * @name Database utility
 * @description Provides primitive database operations and management
 * @version 1.0
 * @author Janar_p
 */

/* Import */
var Datastore = require('nedb')

/* Initilisation */
var db = new Datastore({ filename: __dirname + '/DirectoryWatch.nedb', autoload: true });


/**
 * @name Fetch DirectoryWatch
 * @description Fetch DirectoryWatch history 
 * @param {Object} query
 * @param {nedb} db
 * @returns {Object}
 * @see DB Schema in DBSchema.json
 * @author tharun_p
 */
var fetchDirectoryWatch = function (query, DB) {

    /* Entrich Query with the Type */
    query["type"] = "directoryWatch"

    /* Query Database */
    return new Promise((resolve, reject) => {

        DB.find(query, function (err, docs) {

            /* Handle Database Error */
            if (err) {
                resolve({
                    "error": err,
                    "data": null
                })
            }
            resolve({
                "error": null,
                "data": docs
            })

        });
    })
}


/**
 * @name Fetch Global Constant
 * @description Fetch DirectoryWatch history 
 * @param {Object} query
 * @param {nedb} db
 * @returns {Object}
 * @see DB Schema in DBSchema.json
 * @author tharun_p
 */
var fetchGlobalConstants = function () {

    /* Generate Query with the Type */
    var query = { "type": "globalConstants" }

    /* Query Database */
    return new Promise((resolve, reject) => {

        db.find(query, function (err, docs) {

            /* Handle Database Error */
            if (err) {
                resolve({
                    "error": err,
                    "data": null
                })
            }
            resolve({
                "error": null,
                "data": docs
            })

        });
    })
}

/**
 * @name Update Global Constants
 * @description Used to update the Global Constants
 * @param {Object} query 
 * @param {nedb} db 
 * @returns {Object}
 * @see DB Schema in DBSchema.json
 * @author tharun_p
 */
var updateGlobalConstants = function (updatedConstants) {

    return new Promise((resolve, reject) => {
        /* Update Database */
        db.update({ "type": 'globalConstants' }, { $set: updatedConstants }, { multi: true }, function (err, numReplaced) {

            /* Handle Database Error */
            if (err) {
                resolve({
                    "error": err,
                    "data": null
                })
            }

            /* Handle No Record Updated Error */
            if (numReplaced < 1) {

                resolve({
                    "error": { "error": "No Records Updates" },
                    "data": null
                })
            }

            /* Retrun Success Respone */
            resolve({
                "error": null,
                "data": numReplaced
            })

        });
    })

}

/**
 * @name Create Directory Watch
 * @description Used to create Directory Watch
 * @param {Object} query 
 * @param {nedb} db 
 * @returns {Object}
 * @see DB Schema in DBSchema.json
 * @author tharun_p
 */

var createDirectoryWatch = function (data, DB) {

    /* Enrich Data with Type and TimeStamp */
    data["type"] = "directoryWatch"
    data["timeStamp"] = Date.now()

    return new Promise((resolve, reject) => {

        /* Insert Database */
        DB.insert(data, function (err, newDoc) {

            /* Handle Database Error */
            if (err) {
                resolve({
                    "error": err,
                    "data": null
                })
            }
            else {
                resolve({
                    "error": null,
                    "data": newDoc
                })
            }
        });
    })
}

var createGlobalConstants = function (db) {

    var doc = {
        "type": "globalConstants",
        "directory": "/",
        "magicString": "tharun",
        "lastUpdate": null,
        "frequency": 1,
        "lastModifiedTime": null
    }

    /* Query Database */
    return new Promise((resolve, reject) => {
        db.insert(doc, function (err, newDoc) {
            if (err){
                resolve({"error": err, "data":null})
            }else{
                resolve({"error": null, "data":data})
            }
        });
    })
}

var updateDirectoryWatch = function(query, data){

    return new Promise((resolve, reject) => {

        /* Update Database */
        db.update({ "timeStamp": query.timeStamp }, { $set: data }, { multi: false }, function (err, numReplaced) {

            /* Handle Database Error */
            if (err) {
                resolve({
                    "error": err,
                    "data": null
                })
            }

            /* Handle No Record Updated Error */
            if (numReplaced < 1) {

                resolve({
                    "error": { "error": "No Records Updates" },
                    "data": null
                })
            }

            /* Retrun Success Respone */
            resolve({
                "error": null,
                "data": numReplaced
            })

        });
    })

}



/* Test */
//initDirectoryWatch(db)
//createGlobalConstants(db)
updateGlobalConstants({"frequency": 2}, db)

//console.log(fetchDirectoryWatch({ "magicString": "janar", "directory": "/" }, db))
var a = {
    "directory": "/",
    "magicString": "markZuck",
    "lastScheduleRunTime": "",
    "scheduleFrequency": "",
    "timeStamp": "",
    "addedFiles": [],
    "deleteFiled": [],
    "currentFiles": []
}
//createDirectoryWatch(a, db)

module.exports = {
    db,
    fetchDirectoryWatch,
    createDirectoryWatch,
    updateGlobalConstants,
    createGlobalConstants,
    fetchGlobalConstants,
    updateDirectoryWatch
}