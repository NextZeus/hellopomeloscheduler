var scheduler = require("pomelo-schedule");

var count = 0;
// 带period的环任务，即使某个任务执行过程中出现异常，也不影响整个任务环的执行。

var simpleJob = function(data){
    count++;
    if(count == 2){
        throw new Error("错误");
    }
    console.log("run Job %s time %s" , data.name,Date.now());
    scheduler.scheduleJob({start:Date.now()+2000,period:6000}, simpleJob1, {name: 'simpleJob1'});   
}

var simpleJob1 = function(data){
   console.log("run Job %s time %s" , data.name,Date.now());
   scheduler.scheduleJob({start:Date.now()+2000}, simpleJob2, {name: 'simpleJob2'});   
}

var simpleJob2 = function(data){
   console.log("run Job %s time %s" , data.name,Date.now());
}


// 不带period的任务环，某个任务出现异常，整个环就会断。
var count1 = 0;
var simpleJob3 = function(data){
    count1++;
    if(count == 2){
        throw new Error("错误");
    }
    console.log("run Job %s time %s" , data.name,Date.now());
    scheduler.scheduleJob({start:Date.now()+2000}, simpleJob4, {name: 'simpleJob1'});   
}

var simpleJob4 = function(data){
   console.log("run Job %s time %s" , data.name,Date.now());
   scheduler.scheduleJob({start:Date.now()+2000}, simpleJob5, {name: 'simpleJob2'});   
}

var simpleJob5 = function(data){
    console.log("run Job %s time %s" , data.name,Date.now());
    scheduler.scheduleJob({start:Date.now()+2000}, simpleJob3, {name: 'simpleJob2'});   
}

simpleJob();
simpleJob3();
