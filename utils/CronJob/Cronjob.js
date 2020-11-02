var CronJob = require('cron').CronJob;
const cronTime = require('cron-time-generator');
var dirWatch = require('../DirectoryWatch/directoryWatch')
var jobb = null;

var startJob = function () {
    jobb.start()
}

var stopJob= function () {
    jobb.stop()
}

var newjob = function (time) {
    
    if(jobb){
        jobb.stop();
    }
    var b = cronTime.every(time).minutes();

    jobb = new CronJob(b, function () {
        console.log('Cron Job Started');
        dirWatch()
    }, null, true, 'Asia/Colombo');

    jobb.start()
    return jobb

}


module.exports = {

    startJob,
    stopJob,
    newjob
}



