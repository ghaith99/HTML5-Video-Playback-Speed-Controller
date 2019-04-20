// ==UserScript==
// @name         Universal HTML5 Video Tag
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Ghaith AlGhaith
// @match        *://*/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

console.log("HTML Speed loaded");

//confirm injection
if(!document.getElementById("zeusCSP")) {
    var script  = document.createElement('SCRIPT');
    script.id   = "zeusCSP";
    script.text = "CSP_AllowInlineScript = true;";
    document.head.appendChild(script);
}
if(!CSP_AllowInlineScript) return;

var v;
var currentrunperiod = 0; 

function debounce(fn, debounceDuration){

    debounceDuration = debounceDuration || 100;

    return function(){
        if(!fn.debouncing){
            var args = Array.prototype.slice.apply(arguments);
            fn.lastReturnVal = fn.apply(window, args);
            fn.debouncing = true;
        }
        clearTimeout(fn.debounceTimeout);
        fn.debounceTimeout = setTimeout(function(){
            fn.debouncing = false;
        }, debounceDuration);

        return fn.lastReturnVal;
    };
};

function scrollSpeed( event ) {
    //console.log('scroll');    
    if (v===undefined)
        return;
    
    if( event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0 ) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY

        //scroll down
        v.currentTime  = v.currentTime  - 7;
        console.log('Down');
    } else {
        //scroll up
        v.currentTime  = v.currentTime  + 7;
        console.log('Up');
    }
    //prevent page fom scrolling
    return true;
}

//start main
//on Keydown listener

var CurrentPlaybackRate = 1;

function handle(e){
    v = document.getElementsByTagName("video")[0];
    if (v!==undefined){

        v.onplaying = function(){
            console.log("onplaying : CurrentRate " + CurrentPlaybackRate); 
            v.playbackRate =CurrentPlaybackRate;
        }
        v.onpause = function () {
            console.log("pause : CurrentRate " + CurrentPlaybackRate); 
        }
        v.onended = function(){//udemy auto continue
            console.log("ended");
            $("div[data-purpose='go-to-next'")[0].click(); 
        }


    } else {
        console.log("not defined"); 
        return;
    }


    //Debounce
    if(currentrunperiod >  Date.now()) {
        console.log("debounce"); 
        return;
    }
    currentrunperiod = Date.now()  + (10); //.5sec

    if(!v.paused){

        if(e.keyCode == 107 || e.keyCode == 68){// + numpad or D
            v.playbackRate += 1;
            CurrentPlaybackRate = v.playbackRate ;
            console.log("Speed changed to "+ v.playbackRate);
        }
        if(e.keyCode == 110){//decimal
            v.playbackRate = 1;
            CurrentPlaybackRate = v.playbackRate ;
            console.log("Speed changed to Normal = "+ v.playbackRate);
        }
        if(e.keyCode == 78){//N
            v.playbackRate = 2;
            CurrentPlaybackRate = v.playbackRate ;
            console.log("Speed changed to  = "+ v.playbackRate);
        }
        if(e.keyCode == 77){//M
            v.playbackRate = 3;
            CurrentPlaybackRate = v.playbackRate ;
            console.log("Speed changed to  = "+ v.playbackRate);
        }
        if(e.keyCode == 188){//comma
            v.playbackRate = 4;
            CurrentPlaybackRate = v.playbackRate ;
            console.log("Speed changed to  = "+ v.playbackRate);
        }
        if(e.keyCode == 190){//period
            v.playbackRate = 5;
            CurrentPlaybackRate = v.playbackRate ;
            console.log("Speed changed to  = "+ v.playbackRate);
        }
        if(e.keyCode == 191){// forward slash
            v.playbackRate = 6;
            CurrentPlaybackRate = v.playbackRate ;
            console.log("Speed changed to  = "+ v.playbackRate);
        }

     
        if(e.keyCode == 106){// astrik * 
            v.playbackRate = 4;
            CurrentPlaybackRate = v.playbackRate ;
            console.log("Speed changed to Max with Audio = "+ v.playbackRate);
        }    
        if(e.keyCode == 111){// numpad /
            v.playbackRate = 12;
            CurrentPlaybackRate = v.playbackRate ;
            console.log("Speed changed to Max with/t Audio = "+ v.playbackRate);
        }
        
         if(e.keyCode == 13){// numpad enter
            v.playbackRate = 16;
            CurrentPlaybackRate = v.playbackRate ;
            console.log("Speed changed to Max with/t Audio = "+ v.playbackRate);
        }
        if(e.keyCode == 109 || e.keyCode == 83){// - numpad or S
            if(v.playbackRate != 1){
                CurrentPlaybackRate = v.playbackRate ;
                v.playbackRate -= 1;
                CurrentPlaybackRate = v.playbackRate ;
                console.log("Speed changed to "+ v.playbackRate);
            }
        }

    }
}


window.addEventListener("keydown", handle, true);
