/*
MusicBook v1.1.0
BPM Finder (Tap Tempo) Tool
*/

console.log("BPM Finder Loaded ⏱");


let tapTimes = [];

const tapBtn = document.getElementById("tapButton");
const bpmDisplay = document.getElementById("bpmResult");
const resetBtn = document.getElementById("resetTap");
const tapCountEl = document.getElementById("tapCount");


function registerTap(){

    let now = Date.now();

    tapTimes.push(now);

    // Keep only the last 8 taps for a responsive rolling average

    if(tapTimes.length > 8){

        tapTimes.shift();

    }

    if(tapTimes.length < 2){

        if(bpmDisplay) bpmDisplay.textContent = "--";

        if(tapCountEl) tapCountEl.textContent = "Tap again";

        return;

    }

    let intervals = [];

    for(let i=1; i<tapTimes.length; i++){

        intervals.push(tapTimes[i] - tapTimes[i-1]);

    }

    let avgInterval = intervals.reduce(function(a,b){ return a+b; }, 0) / intervals.length;

    let bpm = Math.round(60000 / avgInterval);

    if(bpmDisplay) bpmDisplay.textContent = bpm;

    if(tapCountEl) tapCountEl.textContent = tapTimes.length + " taps";

}


function resetTaps(){

    tapTimes = [];

    if(bpmDisplay) bpmDisplay.textContent = "--";

    if(tapCountEl) tapCountEl.textContent = "Tap to start";

}


if(tapBtn){

    tapBtn.addEventListener("click", registerTap);

    // Also allow spacebar tapping for convenience

    document.addEventListener("keydown", function(e){

        if(e.code === "Space" && document.activeElement !== tapBtn){

            e.preventDefault();

            registerTap();

        }

    });

}


if(resetBtn){

    resetBtn.addEventListener("click", resetTaps);

}
