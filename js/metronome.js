/*
MusicBook v1.1.0
Metronome Tool
*/

console.log("Metronome Tool Loaded 🥁");


let audioCtx;
let metronomeTimer = null;
let bpm = 120;
let beatCount = 0;
let beatsPerBar = 4;


function getAudioContext(){

    if(!audioCtx){

        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    }

    return audioCtx;

}


function playClick(accent){

    let ctx = getAudioContext();

    let osc = ctx.createOscillator();
    let gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = accent ? 1500 : 1000;

    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);

}


const bpmSlider = document.getElementById("bpm");
const bpmValue = document.getElementById("bpmValue");
const beatsSelect = document.getElementById("beatsPerBar");
const statusPill = document.getElementById("metroStatus");


if(bpmSlider){

    bpmSlider.oninput = function(){

        bpm = parseInt(this.value, 10);

        if(bpmValue){

            bpmValue.innerHTML = bpm + " BPM";

        }

        if(metronomeTimer){

            startMetronome();

        }

    }

}


if(beatsSelect){

    beatsSelect.onchange = function(){

        beatsPerBar = parseInt(this.value, 10);
        beatCount = 0;

    }

}


function startMetronome(){

    stopMetronome();

    getAudioContext();

    let interval = 60000 / bpm;

    playClick(beatCount % beatsPerBar === 0);

    metronomeTimer = setInterval(function(){

        beatCount++;

        playClick(beatCount % beatsPerBar === 0);

    }, interval);

    if(statusPill){

        statusPill.textContent = "Running";
        statusPill.classList.remove("off");

    }

}


function stopMetronome(){

    clearInterval(metronomeTimer);

    metronomeTimer = null;

    beatCount = 0;

    if(statusPill){

        statusPill.textContent = "Stopped";
        statusPill.classList.add("off");

    }

}
