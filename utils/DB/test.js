var a = require('./DB')


//a.createDirectoryWatch({"name":"tharun", "type":"directoryWatch"}, a.db)

a.fetchDirectoryWatch({"name":"tharun"}, a.db).then(
    (a)=>{
        console.log(a)
    }
)