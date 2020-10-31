/**
 * @name Database utility
 * @description Provides primitive database operations and management
 * @version 1.0
 * @author Janar_p
 */

/* Import */
const { query } = require('express');
var Datastore = require('nedb')

/* Initilisation */
db = new Datastore({ filename: 'DirectoryWatch.nedb', autoload: true });


/**
 * @name Fetch DirectoryWatch
 * @description Fetch DirectoryWatch history 
 * @param {Object} query
 * @param {nedb} db
 * @returns {Object}
 * @see DB Schema in DBSchema.json
 * @author tharun_p
 */
var fetchDirectoryWatch = function (query, db) {

    /* Entrich Query with the Type */
    query["type"]="directoryWatch"

    /* Query Database */
    db.find(query, function (err, docs) {

        /* Handle Database Error */
        if (err) {
            return {
                "error": err,
                "data": null
            }
        }
        return {
            "error": null,
            "data": docs
        }
    });
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
var updateGlobalConstants = function (updatedConstants, db) {

    /* Update Database */
    db.update({ "type": 'globalConstants' }, { $set: updatedConstants }, { multi: true }, function (err, numReplaced) {

        /* Handle Database Error */
        if (err) {
            return {
                "error": err,
                "data": null
            }
        }

        /* Handle No Record Updated Error */
        if (numReplaced < 1) {
            return {
                "error": { "error": "No Records Updates" },
                "data": null
            }
        }

        /* Retrun Success Respone */
        return {
            "error": null,
            "data": numReplaced
        }

    });
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

var createDirectoryWatch = function (data, db) {

    /* Enrich Data with Type and TimeStamp */
    data["type"] = "directoryWatch"
    data["timeStamp"] = Date.now()

    /* Insert Database */
    db.insert(data, function (err, newDoc) {

        /* Handle Database Error */
        if (err) {
            return {
                "error": err,
                "data": null
            }
        }
        else {
            return {
                "error": null,
                "data": newDoc
            }
        }
    });
}

var createGlobalConstants = function (db) {

    var doc = {
        "type": "globalConstants",
        "directory": "/",
        "magicString": "tharun",
        "lastrun": "last1",
        "lastModifiedTime": "modifiedTime"
    }

    /* Query Database */
    db.insert(doc, function (err, newDoc) { });
}




/* Test */
//initDirectoryWatch(db)
//createGlobalConstants(db)
//updateGlobalConstants({"directory": "/WORKING"}, db)

//fetchDirectoryWatch({ "magicString": "janar", "directory": "/" }, db)

module.exports = {
    createDirectoryWatch,
    fetchDirectoryWatch,
    updateGlobalConstants,
    createGlobalConstants
}