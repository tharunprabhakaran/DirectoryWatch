/**
 * @name File Pattern Matching Algorithm
 * @author tharun_p
 * @version 1.0
 */

const boyerMooreAlogirthm = require("string-searching");
var fs = require('fs')


var BoyerMoore = async function (filePath, pattern) {

    if (filePath == null || pattern == null) {

        throw { "error": "Invaild Args", "erroCode": "BY1001", "description": "Filepath or pattern cant be null" }
    }

    let isFile = fs.existsSync(filePath) && fs.lstatSync(filePath).isFile();

    if (isFile == false) {
        throw { "error": "fileCheck", "erroCode": "BY1002", "description": "Given Path is not a file or does not Exist" }
    }

    if (isFile == true) {

        return new Promise((resolve, reject) => {

            var counter = 0
            var inc = function (index) {
                if (index == -1) {
                    return 0
                } else {
                    counter = counter + index.length
                }
            }

            reader = fs.createReadStream(filePath);
            reader.on('data', function (chunk) {

                let hayStack = chunk.toString()
                let needle = pattern;

                const indexes = boyerMooreAlogirthm.boyer_moore(hayStack, needle, true);

                inc(indexes)
            });

            reader.on('end', (data) => {
                resolve(counter)
            })
        })
    }
}

var fun = async function () {

    try {
        var a = await BoyerMoore("/Users/tharun/Desktop/Interview/DirectoryWatch/utils/DirectoryWatch/sample.txt", "tharun")
        //console.log(a)
    } catch (error) {
        console.log(error)
    }

}

//fun()
module.exports = BoyerMoore
