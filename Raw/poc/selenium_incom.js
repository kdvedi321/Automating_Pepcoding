//npm init -y
// npm install selenium-webdriver chromedriver
require("chromedriver");
let swd=require("selenium-webdriver");
let fs =require("fs");
// "??"
//browser build
let credentialsFile = process.argv[2];
let metaDataFile = process.argv[3];
let username, password, gModules;
let bldr=new swd.Builder();
// tab
let driver = bldr.forBrowser("chrome").build();

let credentialsWillBeReadPromise = fs.promises.readFile(credentialsFile);
credentialsWillBeReadPromise.then(function(credentials){
    credentials = JSON.parse(credentials);
    username = credentials.username;
    password = credentials.password;
    let googlePageWillOpenedPromise = driver.get("https://www.pepcoding.com/login");
    return googlePageWillOpenedPromise;
}).then(function(){
    //console.log("Google page opened");
    //search email
    //email find promise
    let emailWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=email]"));
    let passwordWillBeSelectedPromise=driver.findElement(swd.By.css("input[type=password]"));
    let combined = Promise.all([emailWillBeSelectedPromise, passwordWillBeSelectedPromise]);
    return combined;
    //return emailWillBeSelectedPromise;
}).then(function(combined){
    let abracadabraWillBeSendPromise = combined[0].sendKeys(username);
    let passwordWillBeEnteredPromise = combined[1].sendKeys(password);
    let combinedcredentials = Promise.all([abracadabraWillBeSendPromise, passwordWillBeEnteredPromise]);
    return combinedcredentials;
    //return abracadabraWillBeSendPromise;
}).then(function(){
    let submitBtnWillSelected = driver.findElement(swd.By.css("button[type=submit]"));
    return submitBtnWillSelected;
}).then(function(submitbtn){
    let submitBtnWillBeClicked=submitbtn.click();
    return submitBtnWillBeClicked;
}).then(function(){
    let willWaitForResourceToLoad = driver.wait(swd.until.elementLocated(swd.By.css(".resource a")));
    return willWaitForResourceToLoad;
}).then(function(){
    //console.log("First Attempt");
    let resourcecardWillBeSelectedPromise=driver.findElement(swd.By.css(".resource a"));
    return resourcecardWillBeSelectedPromise;
}).then(function(resourcePageAnchor){
    let rPageLinkPromise = resourcePageAnchor.getAttribute("href");
    return rPageLinkPromise;
}).then(function(rPageLink){
    let NavigateTOCourseList = driver.get(rPageLink);
    return NavigateTOCourseList;
}).then(function(){
    let siteOverLaySelected = driver.findElement(swd.By.css("#siteOverlay"));
    return siteOverLaySelected; 
    //console.log("Reached Course Page");
}).then(function(soe){
    let waitForOverlayToRemovePromise = driver.wait(swd.until.elementIsNotVisible(soe), 10000);
    return waitForOverlayToRemovePromise;
}).then(function(){
    let courseWillBeLocatedPromise = driver.findElement(swd.By.css("#courseCard33"));
    return courseWillBeLocatedPromise;
}).then(function(courseCard){
    let courseCardWillBeClicked = courseCard.click();
    return courseCardWillBeClicked;
}).then(function(){
    let listTabToBeLocated = driver.wait(swd.until.elementsLocated(swd.By.css(".lis.tab")),10000);
    return listTabToBeLocated;
}).then(goToQuestion);
// .then(function(){
    // let ModulesWillBeSelected = driver.findElements(swd.By.css(".lis.tab"));
    // return ModulesWillBeSelected;
// }).then(function(modules){
//     gModules=modules;
//     console.log(modules.length);
//     let moduleTextPromiseArr = [];
//     for(let i=0;i<modules.length;i++){
//         let moduleNamePromise = modules[i].getText();
//         moduleTextPromiseArr.push(moduleNamePromise);
//     }
//     let AllmoduleNamePromise = Promise.all(moduleTextPromiseArr);
//     return AllmoduleNamePromise;
// }).then(function(AllModulesText){
//     let i;
//     for(i=0;i<AllModulesText.length;i++){
//         if(AllModulesText[i].includes("Dynamic Programming")==true){
//             break;
//         }
//     }
//     let moduleWillBeclickedPromise = gModules[i].click();
//     return moduleWillBeclickedPromise;
// }).then(function(){
//     let metaDataWillBeRead = fs.promises.readFile(metaDataFile);
//     return metaDataWillBeRead;
// }).then(function(metadata){
//     metadata=JSON.parse(metadata);
//     let question = metadata[0];
// }).catch(function(err){
//     console.log(err);
// })

function goToQuestion(){
    return new Promise(function(resolve, reject){
        let waitPromise=willWaitForOverlay
        .then(function(){
            //module
            let willClickModule = navigationHelper(question.module, ".list.tab");
            return willClickModule;
        }).then(willWaitForOverlay).then(function(){
            let willClickLecture = navigationHelper(question.module, ".collection-item");
            return willClickLecture;
        }).then(willWaitForOverlay).then(function(){
            let willClickQuestion = navigationHelper(question.problem, ".collection-item");
            return willClickQuestion;
        }).then(function(){
            resolve();
        }).catch(function(){
            reject();
        })
    })
    //wait for overlay
    //will click on module
    //wait for overlay
    //will click on lecture
    //wait for overlay
    //click on question
}

function willWaitForOverlay(){
    let waitTillPromiseIsDismissed = new Promise(function(resolve, reject){
        let waitForsoe = driver.wait(swd.until.elementLocated(swd.By.css("#siteOverlay")));
        waitForsoe.then(function(){
            let siteOverlayWillBeSelectedPromise = driver.findElement(swd.By.css("#siteOverlay"));
            return siteOverlayWillBeSelectedPromise;
        }).then(function(soe){
            let waitForOverlayToRemovePromise = driver.wait(swd.until.elementIsNotVisible(soe), 1000);
            return waitForOverlayToRemovePromise;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject(err);
        })
    })
}

function navigationHelper(nameToBeSelected, selector){
    let gModules;
    return new Promise(function(resolve,reject){
        let ModulesWillBeSelected = driver.findElements(swd.By.css(selector));
        ModulesWillBeSelected.then(function(modules){
            gModules=modules;
            console.log(modules.length);
            let moduleTextPromiseArr = [];
            for(let i=0;i<modules.length;i++){
                let moduleNamePromise = modules[i].getText();
                moduleTextPromiseArr.push(moduleNamePromise);
            }
            let AllModuleNamesPromise = Promise.all(moduleTextPromiseArr);
            return AllModuleNamesPromise;
        }).then(function(AllModulesText){
            for(let i=0;i<AllModulesText.length;i++){
                if(AllModulesText[i].includes(nameToBeSelected)==true){
                    break;
                }
            }
            let moduleWillBeclickedPromise=gModules[i].click();
            return moduleWillBeclickedPromise;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject(err);
        })    
    })

}
//console.log("Abhi tak kuch nhi hua tha");
// search email =>input
//input email
//search password
//input password
//search submit
// googlePageWillOpenedPromise.catch(function(err){
//     console.log(err);
// })
//let googlePageWillOpenedPromise = driver.get("https://google.com");
//let googlePageWillOpenedPromise = driver.get("https://www.pepcoding.com/login");
// googlePageWillOpenedPromise
// .then(function(){
//     //console.log("Email text has been send");
//     //console.log("Yha sab khtam hua hai");
//     let passwordWillBeSelectedPromise=driver.findElement(swd.By.css("input[type=password]"));
//     return passwordWillBeSelectedPromise;
// }).then(function(passwordElement){
//     let passwordWillBeEnteredPromise = passwordElement.sendKeys(password);
//     return passwordWillBeEnteredPromise; 
// })