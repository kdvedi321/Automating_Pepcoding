require("chromedriver");
let swd=require("selenium-webdriver");
let fs =require("fs");
let credentialsFile = process.argv[2];
let metaDataFile = process.argv[3];
let username, password, gModules, gLectures, gQuestions;
let bldr=new swd.Builder();
let driver = bldr.forBrowser("chrome").build();

let credentialsWillBeReadPromise = fs.promises.readFile(credentialsFile);
credentialsWillBeReadPromise.then(function(credentials){
    credentials = JSON.parse(credentials);
    username = credentials.username;
    password = credentials.password;
    let googlePageWillOpenedPromise = driver.get("https://www.pepcoding.com/login");
    return googlePageWillOpenedPromise;
}).then(function(){
    let emailWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=email]"));
    let passwordWillBeSelectedPromise=driver.findElement(swd.By.css("input[type=password]"));
    let combined = Promise.all([emailWillBeSelectedPromise, passwordWillBeSelectedPromise]);
    return combined;
}).then(function(combined){
    let abracadabraWillBeSendPromise = combined[0].sendKeys(username);
    let passwordWillBeEnteredPromise = combined[1].sendKeys(password);
    let combinedcredentials = Promise.all([abracadabraWillBeSendPromise, passwordWillBeEnteredPromise]);
    return combinedcredentials;
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
}).then(function(){
    let ModulesWillBeSelected = driver.findElements(swd.By.css(".lis.tab"));
    return ModulesWillBeSelected;
}).then(function(modules){
    gModules=modules;
    console.log(modules.length);
    let moduleTextPromiseArr = [];
    for(let i=0;i<modules.length;i++){
        let moduleNamePromise = modules[i].getText();
        moduleTextPromiseArr.push(moduleNamePromise);
    }
    let AllmoduleNamePromise = Promise.all(moduleTextPromiseArr);
    return AllmoduleNamePromise;
}).then(function(AllModulesText){
    let i;
    for(i=0;i<AllModulesText.length;i++){
        if(AllModulesText[i].includes("Dynamic Programming")==true){
            break;
        }
    }
    let moduleWillBeclickedPromise = gModules[i].click();
    return moduleWillBeclickedPromise;
}).then(function(){
    let lectureSelected = driver.findElements(swd.By.css("#module3 .collection.row"));
    return lectureSelected;
}).then(function(modules){
    gLectures = modules;
    console.log(gLectures.length);
    let moduleTextPromiseArr = [];
    for(let i=0;i<modules.length;i++){
        let moduleNamePromise = modules[i].getText();
        moduleTextPromiseArr.push(moduleNamePromise);
    }
    let AllmoduleNamePromise = Promise.all(moduleTextPromiseArr);
    return AllmoduleNamePromise;
}).then(function(lecture){
    let i;
    for(i=0;i<lecture.length;i++){
        console.log(lecture[i]);
        if(lecture[i].includes("Dynamic Programming And Greedy")==true){
            break;
        }
    }
    //console.log(i+" "+gLectures[i]);
    let lectureWillBeSelected = gLectures[i-1].click();
    return lectureWillBeSelected;        
}).then(function(){
    let willWaitForResourceToLoad = driver.wait(swd.until.elementLocated(swd.By.css(".collection-item.no-margin.searchRow")));
    return willWaitForResourceToLoad;
}).then(function(){
    let questionBank = driver.findElements(swd.By.css(".collection-item.no-margin.searchRow"));
    return questionBank;
}).then(function(modules){
    gQuestions = modules;
    console.log(gQuestions.length);
    let moduleTextPromiseArr = [];
    for(let i=0;i<modules.length;i++){
        let moduleNamePromise = modules[i].getText();
        moduleTextPromiseArr.push(moduleNamePromise);
    }
    let AllmoduleNamePromise = Promise.all(moduleTextPromiseArr);
    return AllmoduleNamePromise;
}).then(function(questions){
    let i;
    for(i=0;i<questions.length;i++){
        if(questions[i].includes("Fibonacci-dp")==true){
            break;
        }
    }
    let questionSelected=gQuestions[i].click();
    return questionSelected;
}).then(function(){
    let editorSelected=driver.findElement(swd.By.css(".tab.bold.editorTab"));
    return editorSelected;
}).then(function(editor){
    let editorOpened = editor.click();
    return editorOpened;
}).then(function(){
    let getEditor = driver.findElement(swd.By.css(".ace_content"));
    return getEditor;
}).then(function(editor){
    //let metadata=JSON.parse(metaDataFile);
    let clearCode = editor.clear();
    return clearCode;
}).catch(function(err){
    console.log(err);
})

function goToQuestion(){
    let listTabToBeLocated = driver.wait(swd.until.elementsLocated(swd.By.css(".lis.tab")),10000);
    listTabToBeLocated.then(function(){
        let ModulesWillBeSelected = driver.findElements(swd.By.css(".lis.tab"));
        return ModulesWillBeSelected;
    }).then(function(modules){
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
            if(AllModulesText[i].includes("Dynamic Programming")==true){
                break;
            }
        }
        let moduleWillBeclickedPromise=gModules[i].click();
        return moduleWillBeclickedPromise;
    })
}
console.log("Abhi tak kuch nhi hua tha");

// .then(function(){
//     let willWaitForResourceToLoad = driver.wait(swd.until.elementLocated(swd.By.css("#module3 .card-content.no-padding.module-topics .collection.row a")));
//     return willWaitForResourceToLoad;
// }).then(function(){
//     let qanchor = driver.findElements("#module3 .card-content.no-padding.module-topics .collection.row a");
//     return qanchor;
// }).then(function(questionanchor){
//     let lecLink = [];
//     for(let i=0;i<questionanchor.length;i++){
//         lecLink.push(questionanchor[i].getAttribute("href"));
//     }
//     return lecLink;
// }).then(function(lecLink){
//     let i;
//     let url = "https://www.pepcoding.com/resources/placement-program---bpit/dynamic-programming-and-greedy";
//     for(i=0;i<lecLink.length;i++){
//         if(lecLink[i]==url){
//             let lectureClicked = driver.get(lecLink);
//             return lectureClicked;
//         }
//     }
// })