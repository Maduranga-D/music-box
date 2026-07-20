/*
MusicBook v1.1.0
Electronic Tabla Tool
*/

console.log("Tabla Tool Loaded 🥁");


// Taal patterns: number of beats + accent map
// "X" = Sam (first beat, strong), "O" = Tali (clap, medium), "0" = Khali (empty, soft)

const TAALS = {

    "teentaal": { beats: 16, accents: ["X","0","0","0","O","0","0","0","0","0","0","0","O","0","0","0"] },
    "dadra":    { beats: 6,  accents: ["X","0","0","O","0","0"] },
    "jhaptal":  { beats: 10, accents: ["X","0","O","0","0","O","0","0","X","0"] },
    "rupak":    { beats: 7,  accents: ["0","0","X","0","0","O","0"] }

};


let tablaCtx = null;
let tablaTimer = null;
let tablaRunning = false;
let currentBeat = 0;
let currentTaal = "teentaal";
let tablaBpm = 100;


const taalSelect = document.getElementById("taalSelect");
const bpmSlider = document.getElementById("tablaBpm");
const bpmLabel = document.getElementById("tablaBpmValue");
const startBtn = document.getElementById("startTabla");
const stopBtn = document.getElementById("stopTabla");
const statusEl = document.getElementById("tablaStatus");
const padGrid = document.getElementById("padGrid");


function getCtx(){

    if(!tablaCtx){

        tablaCtx = new (window.AudioContext || window.webkitAudioContext)();

    }

    return tablaCtx;

}


function playHit(type){

    let ctx = getCtx();

    let now = ctx.currentTime;

    let osc = ctx.createOscillator();
    let gain = ctx.createGain();

    osc.type = "triangle";

    if(type === "X"){

        osc.frequency.value = 180;
        gain.gain.setValueAtTime(0.5, now);

    } else if(type === "O"){

        osc.frequency.value = 260;
        gain.gain.setValueAtTime(0.35, now);

    } else{

        osc.frequency.value = 340;
        gain.gain.setValueAtTime(0.15, now);

    }

    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);

}


function renderPads(){

    if(!padGrid) return;

    padGrid.innerHTML = "";

    let taal = TAALS[currentTaal];

    for(let i=0; i<taal.beats; i++){

        let pad = document.createElement("div");

        pad.className = "pad";

        if(taal.accents[i] === "X"){

            pad.classList.add("sam");

        }

        pad.textContent = (i+1) + " " + taal.accents[i];

        padGrid.appendChild(pad);

    }

}


function highlightBeat(index){

    if(!padGrid) return;

    Array.from(padGrid.children).forEach(function(pad, i){

        pad.classList.toggle("active", i === index);

    });

}


function stepTaal(){

    let taal = TAALS[currentTaal];

    playHit(taal.accents[currentBeat]);

    highlightBeat(currentBeat);

    currentBeat = (currentBeat + 1) % taal.beats;

}


function startTabla(){

    stopTabla();

    getCtx();

    currentBeat = 0;

    let interval = 60000 / tablaBpm;

    stepTaal();

    tablaTimer = setInterval(stepTaal, interval);

    tablaRunning = true;

    if(statusEl){

        statusEl.textContent = "Playing";
        statusEl.classList.remove("off");

    }

    if(startBtn) startBtn.disabled = true;

    if(stopBtn) stopBtn.disabled = false;

}


function stopTabla(){

    clearInterval(tablaTimer);

    tablaRunning = false;

    currentBeat = 0;

    highlightBeat(-1);

    if(statusEl){

        statusEl.textContent = "Stopped";
        statusEl.classList.add("off");

    }

    if(startBtn) startBtn.disabled = false;

    if(stopBtn) stopBtn.disabled = true;

}


if(taalSelect){

    taalSelect.addEventListener("change", function(){

        currentTaal = this.value;

        renderPads();

        if(tablaRunning){

            startTabla();

        }

    });

}


if(bpmSlider){

    bpmSlider.addEventListener("input", function(){

        tablaBpm = parseInt(this.value, 10);

        if(bpmLabel) bpmLabel.textContent = tablaBpm + " BPM";

        if(tablaRunning){

            startTabla();

        }

    });

}


if(startBtn){

    startBtn.addEventListener("click", startTabla);

}


if(stopBtn){

    stopBtn.addEventListener("click", stopTabla);

    stopBtn.disabled = true;

}


renderPads();
