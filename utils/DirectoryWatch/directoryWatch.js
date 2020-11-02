/**
 * @name DirectoryWatch
 * @description Watches the directory for addition or deletion of files
 * @version 1.0
 * @author tharun_p
 */

/* Import */
var DatabaseUtils = require('../DB/DB')
const fs = require('fs');
var BoyerMoore = require('./boyerMooreAlgorithm');

/**
 * -------------- Pesueocode  -------------- *
 * 1. Fetch Global Constants (Directory and MagicString)
 * 2. Add a database record for the DirectoryWatch with status as processing
 * 3. Check if Directory is a directory
 * 4. Read Contents of the Directory
 * 5. isFile Append it to the filteredArray && Run Searching Algorithm over the files
 * 6. Return fileReadPromise which retruns filteredArray and Occurance of Magic String in all file
 * 7. Update the Database Record with the count of MagicString Occurance and filteredFileArray. 
 */

/* DirectoryWatch Service */
var directoryWatch = async function () {

    /* Generate Time Stamp */

    let TIMESTAMP = new Date().now

    try {

        /* 1. Fetch Global Constants */
        let constants = await DatabaseUtils.fetchGlobalConstants()


        /* Error handling of the Fetch Global Constatn Response */
        if (constants.data == null || constants.data.length == 0 || constants.error != null) {
            throw { "error": "Error Fetching Global Constants", "errorCode": "DW1001", "description": "Error while fetching global constants", "type": "InternalError" }
        }

        /* Retrive Constants from the resultset */
        let DIRECTORY = constants.data[0].directory
        let MAGICSTRING = constants.data[0].magicString


        /* Null Check for the Global Constatns */
        if (DIRECTORY == null || MAGICSTRING == null) {
            throw { "error": "Error Fetching Global Constants", "errorCode": "DW1002", "description": "Directory or magicstring is null", "type": "InternalError" }
        }

        /* 2.  Add New DirectoryWatch Record in the Database as Processing */

        /* Generate DirectoryWatch Record */
        let data = {
            "directory": constants.data[0].directory,
            "magicString": constants.data[0].magicString,
            "timeStamp": TIMESTAMP,
            "addedFiles": [5],
            "deleteFiled": [],
            "currentFiles": [],
            "magicStringcount": 0,
            "status": "processing",
            "type": "directoryWatch"
        }

        /* Push DirectoryWatch into Database */
        var createDirectoryWatchRecord = await DatabaseUtils.createDirectoryWatch(data, DatabaseUtils.db)
        if (createDirectoryWatchRecord.error) {
            throw {
                "error": createDirectoryWatchRecord.error,
                "errorCode": "DW1003",
                "description": "Given path is not a directory or does not exist",
                "type": "InternalError"
            }
        }
        console.log("DIRECT RECORD CREATE -> ", createDirectoryWatchRecord)

        /*3.  Check if mentioned Directory is a Directory */
        let isDirectory = fs.existsSync(DIRECTORY) && fs.lstatSync(DIRECTORY).isDirectory();
        if (!isDirectory) {
            throw {
                "error": "Error Reading Directory",
                "errorCode": "DW1004",
                "description": "Given path is not a directory or does not exist",
                "type": "InternalError"
            }
        }

        /* Initating File Processing */
        var FileReadPromise = new Promise((resolve, reject) => {

            try {

                /* 4. Reading contents of Directory */
                fs.readdir(DIRECTORY, async (err, files) => {
                    if (err) {
                        throw {
                            "error": err,
                            "errorCode": "DW1005",
                            "description": "Unexpected Error while reading directory",
                            "type": "InternalError"
                        }
                    }

                    /* Initiating filteredFile & PromiseArray*/
                    var filteredFiles = []
                    var PromiseArray = []

                    /* Loop through all contents in the Directory */
                    files.forEach(async (file) => {

                        /* 5.Check for isFile and append it to filteredFile */
                        let isFile = fs.existsSync(DIRECTORY + "/" + file) && fs.lstatSync(DIRECTORY + "/" + file).isFile();

                        if (isFile) {
                            filteredFiles.push(file)
                            var BoyerMoorePromise = BoyerMoore(DIRECTORY + "/" + file, MAGICSTRING)
                            PromiseArray.push(BoyerMoorePromise)
                        }
                    })

                    var response = {
                        "count": await Promise.all(PromiseArray),
                        "files": filteredFiles
                    }

                    resolve(response)
                })
            } catch (error) {
                reject(error)
            }
        })

        /* Retrive the FileProcessing Output */
        var fileWatch = await FileReadPromise
        if (fileWatch) {

            //console.log("FILE ->", fileWatch)
            if (constants.data[0].lastUpdate == null) {
                let sumOfMagicString = fileWatch.count.reduce((a, b) => a + b, 0)
                data = {
                    "directory": DIRECTORY,
                    "magicString": MAGICSTRING,
                    "timeStamp": TIMESTAMP,
                    "addedFiles": fileWatch.files,
                    "deleteFiled": [],
                    "currentFiles": fileWatch.files,
                    "magicStringcount": sumOfMagicString,
                    "status": "completed"
                }
                /* Update Last Batch Time */
                var updateGlobalConstant = await DatabaseUtils.updateGlobalConstants({ "lastUpdate": TIMESTAMP })

                /* Update Last Directory Watch Time */
                var updateDirectoryWatch = await DatabaseUtils.updateDirectoryWatch({ "timeStamp": TIMESTAMP }, data)
                if (updateDirectoryWatch.error || updateGlobalConstant.error) {
                    throw { "error": updateDirectoryWatch.err, "errorCode": "DW1006", "description": "Unexpected Error while Updating Status", "type": "InternalError" }
                }
                else {
                    console.log("UPDATE ->", updateDirectoryWatch)
                    return true
                }
            }
            else {

                var lastRecord = await DatabaseUtils.fetchDirectoryWatch({ "timeStamp": constants.data[0].lastUpdate })

                let deleteFiles = []
                let addedFiles = []

                /* Find Deleted Files */
                lastRecord.currentFiles.forEach(element => {
                    if (!(element in fileWatch.files)) {
                        deleteFiles.push(element)
                    }
                });

                /* Find New Files */
                fileWatch.files.forEach(element => {
                    if (!(element in lastRecord.currentFiles)) {
                        addedFiles.push(element)
                    }
                });

                data = {
                    "directory": DIRECTORY,
                    "magicString": MAGICSTRING,
                    "timeStamp": TIMESTAMP,
                    "addedFiles": addedFiles,
                    "deleteFiled": deleteFiles,
                    "currentFiles": fileWatch.files,
                    "magicStringcount": sumOfMagicString,
                    "status": "completed"
                }

                /* Update Last Directory Watch Time */
                var updateDirectoryWatch = await DatabaseUtils.updateDirectoryWatch({ "timeStamp": TIMESTAMP }, data)
                if (updateDirectoryWatch.error || updateGlobalConstant.error) {
                    throw { "error": updateDirectoryWatch.err, "errorCode": "DW1006", "description": "Unexpected Error while Updating Status", "type": "InternalError" }
                }
                else {
                    console.log("UPDATE ->", updateDirectoryWatch)
                    return true
                }
            }
        }
        return false


    } catch (error) {
        if (error.type == "InternalError") {
            throw error
        } else {
            throw { "error": error, "errorCode": "DW1000", "description": "Error while running directorywatch" }
        }
    }
}



module.exports = directoryWatch