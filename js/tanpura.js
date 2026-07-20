/*
MusicBook v1.1.0
Virtual Tanpura Tool
*/

console.log("Tanpura Tool Loaded 🎵");


// Base frequency for Sa (C4-ish), adjustable by key selector

const KEY_FREQS = {

    "C": 261.63,
    "C#": 277.18,
    "D": 293.66,
    "D#": 311.13,
    "E": 329.63,
    "F": 349.23,
    "F#": 369.99,
    "G": 392.00,
    "G#": 415.30,
    "A": 440.00,
    "A#": 466.16,
    "B": 493.88

};


let tanpuraCtx = null;
let tanpuraNodes = [];
let tanpuraPlaying = false;
let pluckTimer = null;


const keySelect = document.getElementById("tanpuraKey");
const modeSelect = document.getElementById("tanpuraMode");
const startBtn = document.getElementById("startTanpura");
const stopBtn = document.getElementById("stopTanpura");
const statusEl = document.getElementById("tanpuraStatus");
const stringsEl = document.querySelectorAll(".tanpura-string");


// Mode defines the 4-string pattern relative to Sa, in semitones
// Sa-Pa-Sa-Sa (most common), Sa-Ma-Sa-Sa (used for certain ragas)

const MODES = {

    "sa-pa": [0, 7, 0, -12],
    "sa-ma": [0, 5, 0, -12]

};


function semitoneToFreq(base, semitones){

    return base * Math.pow(2, semitones/12);

}


function pluckString(freq, index){

    let ctx = tanpuraCtx;

    let osc = ctx.createOscillator();
    let gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.value = freq;

    let now = ctx.currentTime;

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.28, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 2.7);

    if(stringsEl && stringsEl[index]){

        stringsEl[index].classList.add("pulsing");

        setTimeout(function(){

            stringsEl[index].classList.remove("pulsing");

        }, 500);

    }

}


function startTanpura(){

    tanpuraCtx = new (window.AudioContext || window.webkitAudioContext)();

    tanpuraPlaying = true;

    let baseFreq = KEY_FREQS[keySelect ? keySelect.value : "C"];

    let modeKey = modeSelect ? modeSelect.value : "sa-pa";

    let intervals = MODES[modeKey];

    let stringIndex = 0;

    function cycle(){

        if(!tanpuraPlaying) return;

        let semitones = intervals[stringIndex % intervals.length];

        pluckString(semitoneToFreq(baseFreq, semitones), stringIndex % intervals.length);

        stringIndex++;

        pluckTimer = setTimeout(cycle, 950);

    }

    cycle();

    if(statusEl){

        statusEl.textContent = "Playing";
        statusEl.classList.remove("off");

    }

    if(startBtn) startBtn.disabled = true;

    if(stopBtn) stopBtn.disabled = false;

}


function stopTanpura(){

    tanpuraPlaying = false;

    clearTimeout(pluckTimer);

    if(statusEl){

        statusEl.textContent = "Stopped";
        statusEl.classList.add("off");

    }

    if(startBtn) startBtn.disabled = false;

    if(stopBtn) stopBtn.disabled = true;

}


if(startBtn){

    startBtn.addEventListener("click", startTanpura);

}


if(stopBtn){

    stopBtn.addEventListener("click", stopTanpura);

    stopBtn.disabled = true;

}
