/*
MusicBook v1.0.0
Music Tools JavaScript
*/



console.log("Music Tools Loaded 🎵");




// Audio Support Check


function checkAudioSupport(){


    if(window.AudioContext || window.webkitAudioContext){

        console.log("Audio API Supported");

    }

    else{

        console.log("Audio API Not Supported");

    }


}



checkAudioSupport();







/*
MusicBook Metronome
*/


let metronomeTimer;


let bpm = 120;



const bpmSlider = document.getElementById("bpm");


if(bpmSlider){


bpmSlider.oninput=function(){

bpm=this.value;


let display=document.getElementById("bpmValue");


if(display){

display.innerHTML=bpm+" BPM";

}

}


}




function startMetronome(){


stopMetronome();


let interval = 60000 / bpm;



metronomeTimer=setInterval(function(){


let sound=new Audio(
"../assets/sounds/metronome.wav"
);


sound.play();


},interval);



}




function stopMetronome(){


clearInterval(metronomeTimer);


}