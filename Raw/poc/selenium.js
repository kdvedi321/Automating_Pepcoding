//npm init -y
// npm install selenium-webdriver chromedriver
require("chromedriver");
let swd=require("selenium-webdriver");
let fs =require("fs");
let credentialsFile = process.argv[2];
let metaDataFile = process.argv[3];
//let courseName = process.argv[4];
//browser build
let bldr=new swd.Builder();
// tab
let driver = bldr.forBrowser("chrome").build();
//promise => page open future
//value => value
//pending
//depended=>
//independent
let username, password;
//**************Login*************/
let credentialsWillBeReadPromise = fs.promises.readFile(credentialsFile);
credentialsWillBeReadPromise.then(function(credentials){
    //buffer
    credentials = JSON.parse(credentials);
    username = credentials.username;
    password = credentials.password;
    //login page
    let googlePageWillOpenedPromise = driver.get("https://www.pepcoding.com/login");
    return googlePageWillOpenedPromise;
}).then(function(){
    let willBeSetPromise = driver.manage().setTimeouts({
        implicit: 10000
    })
    return willBeSetPromise;
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
})
//*******************Home Page**************
.then(function(){
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
}).then(willWaitForOverlay)
.then(function(){
    let courseWillBeLocatedPromise = driver.findElement(swd.By.css("#courseCard33"));
    return courseWillBeLocatedPromise;
}).then(function(courseCard){
    let courseCardWillBeClicked = courseCard.click();
    return courseCardWillBeClicked;
}).then(function(){
    let metaDataWillBeRead = fs.promises.readFile(metaDataFile);
    return metaDataWillBeRead;
}).then(function(metadata){
    metadata = JSON.parse(metadata);
    let question = metadata[0];
    let willWaitToBenavigatedToQnPg = goToQuestionPage(question);
    return willWaitToBenavigatedToQnPg;
    //driver.quit();
}).catch(function(err){
    console.log(err);
})

function goToQuestion(){
    //resource page
    return new Promise(function(resolve, reject){
        let waitPromise=willWaitForOverlay();
        waitPromise.then(function(){
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
        //let us assume done is working
        // search overlay
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
        //wait
    })
    return waitTillPromiseIsDismissed;
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
