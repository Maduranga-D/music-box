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


// Starry black background with twinkling music icons

function buildStarfield(){

    if(document.querySelector(".starfield")) return;

    let field = document.createElement("div");
    field.className = "starfield";
    field.setAttribute("aria-hidden", "true");
    document.body.prepend(field);

    let small = window.innerWidth < 600;

    let starCount = small ? 45 : 90;

    for(let i=0; i<starCount; i++){

        let s = document.createElement("span");
        s.className = "star" + (Math.random() > 0.82 ? " big" : "");
        s.style.left = (Math.random()*100).toFixed(2)+"%";
        s.style.top = (Math.random()*100).toFixed(2)+"%";
        s.style.animationDelay = (Math.random()*4).toFixed(2)+"s";
        s.style.animationDuration = (2.5 + Math.random()*3).toFixed(2)+"s";
        field.appendChild(s);

    }

    let icons = ["🎵","🎶","🎼","🎹","🎸","🥁","🎻","♪","♫","🎧"];

    let iconCount = small ? 7 : 14;

    for(let i=0; i<iconCount; i++){

        let el = document.createElement("span");
        el.className = "star-icon";
        el.textContent = icons[Math.floor(Math.random()*icons.length)];
        el.style.left = (Math.random()*96).toFixed(2)+"%";
        el.style.top = (Math.random()*96).toFixed(2)+"%";
        el.style.fontSize = (14 + Math.random()*12).toFixed(0)+"px";
        el.style.animationDelay = (Math.random()*4.5).toFixed(2)+"s";
        el.style.animationDuration = (3 + Math.random()*3.5).toFixed(2)+"s";
        field.appendChild(el);

    }

}


// Simple Page Loading Effect

window.onload = function(){

    console.log("MusicBook Loaded Successfully");

    initNav();
    highlightActiveLink();
    buildEqualizer();
    buildStarfield();

}
