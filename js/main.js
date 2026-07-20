/*
MusicBook v1.1.0
Main JavaScript
*/


// Welcome Message

console.log("Welcome to MusicBook 🎵");


// Explore Tools Button Function

function openTools(){

    let base = document.body.getAttribute("data-root") || "";

    window.location.href = base + "pages/tools.html";

}


// Mobile Nav Toggle

function initNav(){

    let toggle = document.querySelector(".nav-toggle");
    let nav = document.querySelector("nav");

    if(toggle && nav){

        toggle.addEventListener("click", function(){

            nav.classList.toggle("open");

        });

        nav.querySelectorAll("a").forEach(function(link){

            link.addEventListener("click", function(){

                nav.classList.remove("open");

            });

        });

    }

}


// Highlight current nav link

function highlightActiveLink(){

    let links = document.querySelectorAll("nav a");
    let current = window.location.pathname.split("/").pop() || "index.html";

    links.forEach(function(link){

        let href = link.getAttribute("href").split("/").pop();

        if(href === current){

            link.classList.add("active");

        }

    });

}


// Build a small equalizer bar animation used on the hero

function buildEqualizer(){

    let eq = document.querySelector(".eq-bars");

    if(!eq) return;

    let bars = 28;

    for(let i=0; i<bars; i++){

        let span = document.createElement("span");

        span.style.animationDelay = (Math.random()*1.2).toFixed(2)+"s";

        span.style.height = (10 + Math.random()*40)+"px";

        eq.appendChild(span);

    }

}


// Simple Page Loading Effect

window.onload = function(){

    console.log("MusicBook Loaded Successfully");

    initNav();
    highlightActiveLink();
    buildEqualizer();

}
