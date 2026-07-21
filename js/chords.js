/*
MusicBook v1.1.0
Chord Dictionary Tool
*/

console.log("Chord Dictionary Loaded 🎸");


let allChords = [];


const searchInput = document.getElementById("chordSearch");
const categorySelect = document.getElementById("chordCategory");
const chordGrid = document.getElementById("chordGrid");
const emptyState = document.getElementById("chordEmpty");


function buildDiagramSVG(frets){

    let strings = 6;
    let fretsShown = 4;
    let width = 130;
    let height = 150;
    let leftPad = 20;
    let topPad = 20;
    let stringGap = (width - leftPad*2) / (strings - 1);
    let fretGap = (height - topPad*2) / fretsShown;

    let svg = '<svg viewBox="0 0 '+width+' '+height+'" xmlns="http://www.w3.org/2000/svg">';

    // Nut

    svg += '<rect x="'+leftPad+'" y="'+topPad+'" width="'+(width-leftPad*2)+'" height="4" fill="#F5F5F7"/>';

    // Strings

    for(let s=0; s<strings; s++){

        let x = leftPad + s*stringGap;

        svg += '<line x1="'+x+'" y1="'+topPad+'" x2="'+x+'" y2="'+(topPad + fretGap*fretsShown)+'" stroke="#9CA3AF" stroke-width="1.5"/>';

    }

    // Frets

    for(let f=0; f<=fretsShown; f++){

        let y = topPad + f*fretGap;

        svg += '<line x1="'+leftPad+'" y1="'+y+'" x2="'+(width-leftPad)+'" y2="'+y+'" stroke="#9CA3AF" stroke-width="1"/>';

    }

    // Finger positions and open/mute markers

    frets.forEach(function(fret, i){

        let x = leftPad + i*stringGap;

        if(fret === -1){

            svg += '<text x="'+x+'" y="'+(topPad-6)+'" font-size="10" fill="#E63946" text-anchor="middle">x</text>';

        } else if(fret === 0){

            svg += '<circle cx="'+x+'" cy="'+(topPad-9)+'" r="4" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>';

        } else{

            let y = topPad + (fret-0.5)*fretGap;

            svg += '<circle cx="'+x+'" cy="'+y+'" r="6" fill="#E63946"/>';

        }

    });

    svg += '</svg>';

    return svg;

}


function renderChords(list){

    if(!chordGrid) return;

    chordGrid.innerHTML = "";

    if(list.length === 0){

        if(emptyState) emptyState.style.display = "block";

        return;

    }

    if(emptyState) emptyState.style.display = "none";

    list.forEach(function(chord){

        let item = document.createElement("div");

        item.className = "chord-item";

        item.innerHTML =
            "<h3>" + chord.name + "</h3>" +
            '<div class="chord-diagram">' + buildDiagramSVG(chord.frets) + "</div>" +
            "<p>" + chord.category + "</p>";

        chordGrid.appendChild(item);

    });

}


function applyFilters(){

    let query = searchInput ? searchInput.value.trim().toLowerCase() : "";

    let category = categorySelect ? categorySelect.value : "All";

    let filtered = allChords.filter(function(chord){

        let matchesQuery = chord.name.toLowerCase().includes(query);

        let matchesCategory = category === "All" || chord.category === category;

        return matchesQuery && matchesCategory;

    });

    renderChords(filtered);

}


async function loadChords(){

    try{

        let response = await fetch("../data/chords.json");

        allChords = await response.json();

        renderChords(allChords);

    } catch(err){

        console.log("Could not load chord data", err);

        if(chordGrid){

            chordGrid.innerHTML = "<p>Could not load chord data.</p>";

        }

    }

}


if(searchInput){

    searchInput.addEventListener("input", applyFilters);

}


if(categorySelect){

    categorySelect.addEventListener("change", applyFilters);

}


loadChords();
