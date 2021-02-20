// ==UserScript==
// @name         Party Time - YT
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Skip all skippable ads without waiting for skip ad button to show up, and etc.
// @author       GSRHackZ
// @match        https://www.youtube.com/*
// @grant        none
// @icon         https://www.flaticon.com/svg/864/864763.svg
// ==/UserScript==

let count=0,vid,saveMode;
const doc=document;
setInterval(function(){
    vid = document.getElementsByClassName("video-stream html5-main-video")[0];
    if(localStorage.getItem("party")=="true"){
        start();
        saveMode=true;
    }
    else{
        stop();
        saveMode=false;
    }
},1500)

let partyMode=function(){
    if(document.getElementsByClassName("video-stream html5-main-video")[0]!==undefined){
        if(document.getElementsByClassName("ytp-ad-text ytp-ad-skip-button-text")[0]!==undefined){
            let skipBtn=document.getElementsByClassName("ytp-ad-text ytp-ad-skip-button-text")[0];
            skipBtn.click();
        }
        if(document.getElementsByClassName("style-scope ytd-watch-next-secondary-results-renderer sparkles-light-cta GoogleActiveViewElement")[0]!==undefined){
            let sideAd=document.getElementsByClassName("style-scope ytd-watch-next-secondary-results-renderer sparkles-light-cta GoogleActiveViewElement")[0];
            sideAd.style.display="none";
        }
        if(document.getElementsByClassName("ytp-ad-message-container")[0]!==undefined){
            let incomingAd=document.getElementsByClassName("ytp-ad-message-container")[0];
            incomingAd.style.display="none";
        }
        if(document.getElementsByClassName("badge badge-style-type-ad style-scope ytd-badge-supported-renderer")[0]!==undefined){
            let adY=document.getElementsByClassName("badge badge-style-type-ad style-scope ytd-badge-supported-renderer");
            for(var i=0;adY.length>i;i++){
                adY[i].style.display="none";
            }
        }
    }
}


doc.addEventListener('keyup', function(evt){
    if(evt.keyCode==192){
        count++;
        if(count>1||saveMode==true){
            stop();
            console.log("Aw leaving so soon? 😕😒");
        }
        else{
            start();
            console.log("Party Time Activated 🥳🎉🎈");
        }
    }
})

function start(){
    setInterval(partyMode,10);
    vid.loop=true;
    localStorage.setItem("party",true);
}
function stop(){
    clearInterval(partyMode);
    vid.loop=false;
    count=0;
    localStorage.setItem("party",false);
}
