const fs = require("fs");
// promise based fn use => promise => pending
// const fileWillBeReadPromise = fs.promises.readFile("f1.html");
// paradigm

function promisifyfs(path){
    let fileWillBeReadPromise = new Promise(function(resolve, reject){
        fs.readFile(path, function(err, data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
    return fileWillBeReadPromise;
}
let fileWillBeReadPromise = promisifyfs("f1.html");
// const fileWillBeReadPromise = fs.promises.readFile("f1.html");
// console.log(fileWillBeReadPromise);
fileWillBeReadPromise.then(function(data){
    console.log("Inside scb");
    console.log(data.length);
    //let f2WillBeReadPromise = promisifyfs("f2.html");
    //return f2WillBeReadPromise;
},
function(err){
    console.log("Inside fcb");
    console.log(err);
    //let f2WillBeReadPromise = promisifyfs("f2.html");
    //return f2WillBeReadPromise;
}).then(function(data){
    console.log("Inside 2nd then");
    console.log(data);
})


// // reject => err
fileWillBeReadPromise.catch(function(err){
    console.log("Inside catch");
    console.log(err);
})
// //cosumer