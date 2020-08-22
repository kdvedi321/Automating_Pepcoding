let fs=require("fs");
console.log("Before");
console.log("Start");
let fileWillBeReadPromise=fs.promises.readFile("f1.html");
console.log(fileWillBeReadPromise);
console.log("After");
fileWillBeReadPromise.then(function(content){
    console.log(content + " ");
    console.log("Finish");
})
fileWillBeReadPromise.catch(function(err){
    console.log(err);
})
setTimeout(function(){
    console.log("I was called after 3sec");
    console.log(fileWillBeReadPromise);
},3000)
console.log("After");
console.log("I will execute");