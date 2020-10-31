// const dirTree = require("directory-tree");

// var filteredTree = dirTree('/Users/tharun/Desktop/Interview/Work', ['.jpg', '.png']);

// console.log(filteredTree)
// console.log(filteredTree.children[2].children)


const { rejects } = require('assert');
const { count } = require('console');
const fs = require('fs');
const { resolve } = require('path');
const ss = require("string-searching");

var directory = '/Users/tharun/Desktop/Interview/Work';


// Use fs.createReadStream() method 
// to read the file 
reader = fs.createReadStream('sample.txt');

var counter = 0
// Read and disply the file data on console 
reader.on('data', function (chunk) {


    const text = chunk.toString();
    const pattern = "tharun";

    // search first index of pattern (like the String.prototype.indexOf() do).
    //const index = ss.boyer_moore(text, pattern);

    // or passing true to search all patterns.
    const indexes = ss.boyer_moore(text, pattern, true);
    if(indexes != -1){
        counter = counter+indexes.length
    }
});

reader.on('end', (data)=>{
    console.log(counter)
})

// fs.readdir(directory, (err, files) => {
//     if (err) {
// handle error; e.g., folder didn't exist 
//     }
//console.log(files)

//     var a = []
//     files.forEach(async (file) => {

//         var fsStat = new Promise(async (resolve, rejects) => {

//             fs.lstat("/Users/tharun/Desktop/Interview/Work/" + file, ((err, stats) => {
//                 if (err) {
//                      rejects(err) 
//                 }
//                 if(stats.isDirectory()){
//                     rejects("DIRECTORY")
//                 }
//                 resolve(file)
//             }))

//         })

//         try {
//             console.log(await fsStat)

//         } catch (error) {
//             console.log(error)
//         }





//  });
//console.log(a)






//}); 


// reader = fs.createReadStream('./sample.txt');
// const ss = require("string-searching");

// var counter = 0
// var inc = function (index) {
//     if (index == -1) {
//         return 0
//     } else {
//         counter = counter + index.length
//     }
// }

// //inc()
// //inc()
// console.log(counter)

// // Read and disply the file data on console 
// reader.on('data', function (chunk) {
//     //console.log(chunk.toString());

//     const text = chunk.toString()
//     const pattern = "tharun";

//     const indexes = ss.boyer_moore(text, pattern, true);
//     //console.log(indexes)
//     //counter = counter + indexes.length
//     inc(indexes)
//     //console.log(indexes)
// });

// reader.on('end', (data) => {
//     console.log(counter)
// })

// // const ss = require("string-searching");
// // const text = "HERE IS A SIMPLE EXAMPLE , HERE IS A SIMPLE EXAMPLE ,  HERE IS A SIMPLE EXAMPLE, HERE IS A SIMPLE EXAMPLE,  XAMPLE,XAMPLEXAMPLEXAMPLE";
// // const pattern = " EXAMPLE ";

// // // search first index of pattern (like the String.prototype.indexOf() do).
// // const index = ss.boyer_moore(text, pattern);

// // // or passing true to search all patterns.
// // const indexes = ss.boyer_moore(text, pattern, true);

// // console.log(index)
// // console.log(indexes)