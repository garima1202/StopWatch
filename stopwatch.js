//resources
let container = document.getElementById("container");
let time = document.getElementById("time");
let reset = document.getElementById("reset");
let playPause = document.getElementById("play-pause");
let lap = document.getElementById("lap");

//first (main) timer display    
milSec = 0;
sec = 0;
min = 0;
function startTimer(){
    timer = setInterval(() => {
        milSec++;
        if (milSec >= 100){
            sec++;
            milSec = 0;
        }
        if (sec >= 60){
            min++;
            sec = 0;
        }
        display = `${min < 10 ? '0' : ''}${min}" ${sec < 10 ? '0' : ''}${sec}" ${milSec < 10 ? '0' : ''}${milSec}`;
        time.innerText = display;
    }, 12);
}

//second timer display for intervals between time laps
milSec2 = 0;
sec2 = 0;
min2 = 0;

let timer2 = setInterval(() => {
    milSec2++;
    if (milSec2 >= 60){
        sec2++;
        milSec2 = 0;
    }
    if (sec2 >= 60){
        min2++;
        sec2 = 0;
    }
    display2 = `${min2 < 10 ? '0' : ''}${min2} : ${sec2 < 10 ? '0' : ''}${sec2} : ${milSec2 < 10 ? '0' : ''}${milSec2}`;
    //console.log(display2);
}, 12);

//stored the inner element (the icons) of each span element into variables
let playPauseIcon = playPause.firstElementChild;
let resetIcon = reset.firstElementChild;
let lapIcon = lap.firstElementChild;

//if not started, make reset button inaccessible
if (time.innerText == '00" 00" 00'){
    resetIcon.style.color = 'grey';
    resetIcon.style.cursor = 'not-allowed';
}

//PLAY | PAUSE BUTTON
playPause.addEventListener('click', () => { //play
    if (playPauseIcon.classList.contains('fa-play')){
        //make reset button inaccessible when timer is still counting
        resetIcon.style.color = 'grey';
        resetIcon.style.cursor = 'not-allowed';
        startTimer();
        playPauseIcon.classList.toggle('fa-play');
    }
    else{ //pause
        //make reset button accessible when timer is paused
        if (time.style.color == "white"){
            resetIcon.style.color = "white";
        }
        else{
            resetIcon.style.color = blueColor;
        }
        resetIcon.style.cursor = 'pointer';
        time.innerText = time.innerText;
        clearInterval(timer);
        playPauseIcon.classList.toggle('fa-play');
        
        //store the current values of timer appropriately into min sec and milSec
        //do the same for the timer2 intervals
        min = Number(`${time.innerText[0]}${time.innerText[1]}`);
        sec = Number(`${time.innerText[4]}${time.innerText[5]}`);
        milSec = Number(`${time.innerText[8]}${time.innerText[9]}`);
        // min2 = Number(`${display2[0]}${display2[1]}`);
        // sec2 = Number(`${display2[5]}${display2[6]}`);
        // milSec2 = Number(`${display2[10]}${display2[11]}`);
    }
});

//RESET BUTTON
reset.addEventListener('click', () => {
    if(resetIcon.style.color == 'grey'){ //if reset button isn't accessible do nothing
        //do nothing;
    }
    else {
        clearInterval(timer);
        time.innerText = '00" 00" 00';
        milSec = sec = min = 0;
        min2 = sec2 = milSec2 = 0;
        //if not started, make reset button inaccessible
        if (time.innerText == '00" 00" 00'){
            resetIcon.style.color = 'grey';
            resetIcon.style.cursor = 'not-allowed';
        }
        //remove all time intervals
        intervalContainer = document.getElementById("time-interval-container");
        intervalContainer.innerHTML = '';
        serialNum = 1;
    }
});


//function to create new time laps
function newLap(sn, lapTime, lapInterval){
    lapTime = lapTime.replace(/"/g, ' : ');
    let timeInterval = document.createElement('div');
    let SN = document.createElement('p');
    let timeInstance = document.createElement('p');
    let interval = document.createElement('p');
    timeInterval.classList.add("time-interval");
    timeInterval.setAttribute("id", "time-interval");
    SN.setAttribute("id", "SN");
    timeInstance.setAttribute("id", "time-instance");
    interval.setAttribute("id", "interval");
    //appended the paragraphs to the div
    timeInterval.appendChild(SN);
    timeInterval.appendChild(timeInstance);
    timeInterval.appendChild(interval);
    
    //filled in values for SN, timeInstance and timeInterval
    SN.innerText = sn;
    timeInstance.innerText = lapTime;
    interval.innerText = lapInterval;
    timeIntervalContainer = document.getElementById("time-interval-container");
    timeIntervalContainer.insertBefore(timeInterval, timeIntervalContainer.firstElementChild);
    //alert(timeInterval.firstChild);
}


//LAP BUTTON
let serialNum = 1;
lap.addEventListener("click", () => {
    if (! playPauseIcon.classList.contains('fa-play')){ //if timer isn't paused
        if (time.innerText == '00" 00" 00'){
            //do nothing; 
        }
        else{
            newLap(serialNum, time.innerText, display2);
            min2 = sec2 = milSec2 = 0;
            serialNum++;   
        }
        //reset values for second display
        min2 = sec2 = milSec2 = 0;
    }
});

//LIGHT | DARK MODE
let mode = document.getElementById("mode");
let darkModeSwitch = document.getElementById("dark-mode");
let set = "light";
let greyColor = "rgb(94, 94, 94)";
let pinkColor = "rgb(236, 29, 133)";
let blueColor = "rgba(20, 67, 255, 0.824)";
darkModeSwitch.addEventListener("click", () => {
    //change colors of several elements based on applicationcolor mode (light or dark)
    document.getElementById("time-interval-container").style.color = "white";
    document.getElementById("mode-text").style.color = "white";
    if (set == "light"){
        darkModeSwitch.classList.toggle("fa-toggle-on");
        mode.classList.toggle("fa-sun");
        document.body.style.backgroundColor = "black";
        document.getElementById("buttons").style.backgroundColor = "black";
        time.style.borderColor = pinkColor; 
        mode.style.color = "white";    
        darkModeSwitch.style.color = "white";  
        time.style.color = "white";
        playPause.style.backgroundColor = pinkColor;
        reset.style.color = "white";
        lap.style.color = "white";
        set = "dark";
    }
    else{        
        document.getElementById("time-interval-container").style.color = "rgb(94, 94, 94)";
        document.getElementById("mode-text").style.color = "rgb(94, 94, 94)";
        darkModeSwitch.classList.toggle("fa-toggle-on");
        mode.classList.toggle("fa-sun");
        document.body.style.backgroundColor = "white";
        document.getElementById("buttons").style.backgroundColor = "white";
        time.style.borderColor = "rgb(128, 128, 128)"; 
        document.body.style.color = greyColor;      
        mode.style.color = greyColor;    
        darkModeSwitch.style.color = greyColor;  
        time.style.color = greyColor;
        playPause.style.backgroundColor = blueColor;
        reset.style.color = blueColor;
        lap.style.color = blueColor;
        set = "light";  
    } 

});