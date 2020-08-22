let fs = require("fs");
console.log("Before");
console.log("Start");
let f1content=fs.readFileSync("f1.html","utf8");
console.log(f1content+"");
let f2content=fs.readFileSync("f2.html","utf8");
console.log(f2content+"");
console.log("After");
console.log("After");