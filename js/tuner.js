/*
MusicBook v1.1.0
Instrument Tuner Tool
*/

console.log("Tuner Tool Loaded 🎻");


const NOTE_NAMES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

let tunerAudioCtx = null;
let tunerStream = null;
let tunerAnalyser = null;
let tunerRunning = false;
let tunerRAF = null;


const startBtn = document.getElementById("startTuner");
const stopBtn = document.getElementById("stopTuner");
const noteEl = document.getElementById("tunerNote");
const freqEl = document.getElementById("tunerFreq");
const needleEl = document.getElementById("tunerNeedle");
const statusEl = document.getElementById("tunerStatus");


function freqToNote(freq){

    let noteNum = 12 * (Math.log(freq / 440) / Math.log(2));

    noteNum = Math.round(noteNum) + 69;

    let name = NOTE_NAMES[noteNum % 12];

    let octave = Math.floor(noteNum / 12) - 1;

    let standardFreq = 440 * Math.pow(2, (noteNum - 69) / 12);

    let cents = 1200 * Math.log(freq / standardFreq) / Math.log(2);

    return { name: name + octave, cents: cents };

}


// Autocorrelation pitch detection (ACF2+)

function autoCorrelate(buffer, sampleRate){

    let SIZE = buffer.length;

    let rms = 0;

    for(let i=0; i<SIZE; i++){

        rms += buffer[i]*buffer[i];

    }

    rms = Math.sqrt(rms / SIZE);

    if(rms < 0.01){

        return -1;

    }

    let r1 = 0, r2 = SIZE-1, thres = 0.2;

    for(let i=0; i<SIZE/2; i++){

        if(Math.abs(buffer[i]) < thres){ r1 = i; break; }

    }

    for(let i=1; i<SIZE/2; i++){

        if(Math.abs(buffer[SIZE-i]) < thres){ r2 = SIZE-i; break; }

    }

    let trimmed = buffer.slice(r1, r2);

    let newSize = trimmed.length;

    let c = new Array(newSize).fill(0);

    for(let i=0; i<newSize; i++){

        for(let j=0; j<newSize-i; j++){

            c[i] += trimmed[j]*trimmed[j+i];

        }

    }

    let d = 0;

    while(c[d] > c[d+1]) d++;

    let maxVal = -1, maxPos = -1;

    for(let i=d; i<newSize; i++){

        if(c[i] > maxVal){

            maxVal = c[i];
            maxPos = i;

        }

    }

    let T0 = maxPos;

    if(T0 <= 0){

        return -1;

    }

    return sampleRate / T0;

}


function updateNeedle(cents){

    if(!needleEl) return;

    let clamped = Math.max(-50, Math.min(50, cents));

    let angle = (clamped / 50) * 45;

    needleEl.style.transform = "rotate(" + angle + "deg)";

    if(Math.abs(cents) < 5){

        needleEl.style.background = "var(--secondary)";

    } else{

        needleEl.style.background = "var(--gold)";

    }

}


function tunerLoop(){

    if(!tunerRunning) return;

    let buffer = new Float32Array(tunerAnalyser.fftSize);

    tunerAnalyser.getFloatTimeDomainData(buffer);

    let freq = autoCorrelate(buffer, tunerAudioCtx.sampleRate);

    if(freq !== -1 && freq > 0){

        let result = freqToNote(freq);

        if(noteEl) noteEl.textContent = result.name;

        if(freqEl) freqEl.textContent = freq.toFixed(1) + " Hz";

        updateNeedle(result.cents);

    } else{

        if(noteEl) noteEl.textContent = "--";

        if(freqEl) freqEl.textContent = "Listening...";

    }

    tunerRAF = requestAnimationFrame(tunerLoop);

}


async function startTuner(){

    try{

        tunerStream = await navigator.mediaDevices.getUserMedia({ audio: true });

        tunerAudioCtx = new (window.AudioContext || window.webkitAudioContext)();

        let source = tunerAudioCtx.createMediaStreamSource(tunerStream);

        tunerAnalyser = tunerAudioCtx.createAnalyser();

        tunerAnalyser.fftSize = 2048;

        source.connect(tunerAnalyser);

        tunerRunning = true;

        if(statusEl){

            statusEl.textContent = "Listening";
            statusEl.classList.remove("off");

        }

        if(startBtn) startBtn.disabled = true;

        if(stopBtn) stopBtn.disabled = false;

        tunerLoop();

    } catch(err){

        console.log("Microphone access denied or unavailable", err);

        if(statusEl){

            statusEl.textContent = "Microphone access needed";

        }

    }

}


function stopTuner(){

    tunerRunning = false;

    if(tunerRAF) cancelAnimationFrame(tunerRAF);

    if(tunerStream){

        tunerStream.getTracks().forEach(function(track){ track.stop(); });

    }

    if(noteEl) noteEl.textContent = "--";

    if(freqEl) freqEl.textContent = "Press Start Tuner";

    if(statusEl){

        statusEl.textContent = "Stopped";
        statusEl.classList.add("off");

    }

    if(startBtn) startBtn.disabled = false;

    if(stopBtn) stopBtn.disabled = true;

}


if(startBtn){

    startBtn.addEventListener("click", startTuner);

}


if(stopBtn){

    stopBtn.addEventListener("click", stopTuner);

    stopBtn.disabled = true;

}
