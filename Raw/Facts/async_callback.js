let fs=require("fs");
console.log("Before");
console.log("Start");
fs.readFile("f1.html",function(err,f1content){
    if(err){
        console.log(err);
    }
    else{
        console.log(f1content + " ");
        fs.readFile("f2.html",function(err, f2content){
            if(err){
                console.log(err);
            }
            else{
                console.log(f2content+" ");
            }
        })
    }
    console.log("Finish");
})
console.log("After");