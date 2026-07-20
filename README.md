==================================================
              MusicBook v1.1.0
     Online Music Toolkit Platform
==================================================


Developer:
m-PdeveloperPro

Contact:
madurangadahanake@gmail.com


Project Purpose:
A complete online music toolkit for musicians,
students and music lovers.

Main Goal:
Learn | Practice | Create | Perform


==================================================
STATUS: ALL PAGES AND TOOLS COMPLETE
==================================================

Every page now works, every tool card links to a
finished tool, the theme has been refined and made
consistent across all pages, animations run on every
page (with prefers-reduced-motion respected), the
Contact page has a working feedback form, and the
layout is responsive on mobile.


==================================================
TECHNOLOGY
==================================================

Frontend:
- HTML5
- CSS3
- Vanilla JavaScript (Web Audio API, MediaDevices API)

Hosting:
- GitHub Pages (or any static host)

No build step, no backend, and no external services
required. All audio (metronome clicks, tanpura drone,
tabla hits) is synthesized in the browser with the Web
Audio API, so there are no sound files to manage.


==================================================
PROJECT STRUCTURE
==================================================


MusicBook/

|
|-- index.html
|
|-- css/
|    |-- style.css
|    |-- animation.css
|
|-- js/
|    |-- main.js          (nav, active links, hero equalizer)
|    |-- metronome.js
|    |-- tuner.js
|    |-- tanpura.js
|    |-- tabla.js
|    |-- chords.js
|    |-- bpm.js
|
|-- pages/
|    |-- tools.html
|    |-- about.html
|    |-- contact.html      (working feedback form)
|
|-- tools/
|    |-- metronome.html
|    |-- tuner.html
|    |-- tanpura.html
|    |-- tabla.html
|    |-- chords.html
|    |-- bpm.html
|    |-- instruments.html  (tuning reference)
|
|-- data/
|    |-- chords.json
|    |-- ragas.json
|
|-- assets/
     |-- images/
     |-- icons/


==================================================
TOOLS (ALL WORKING)
==================================================


🎻 Instrument Tuner
- Live pitch detection via microphone + autocorrelation
- Note name, frequency, and a tuning-accuracy needle


🎵 Virtual Tanpura
- Sa-Pa-Sa-Sa or Sa-Ma-Sa-Sa drone
- 12 selectable keys


🥁 Metronome
- 40-240 BPM
- Selectable beats per bar with an accented first beat


🪘 Electronic Tabla
- Teentaal, Dadra, Jhaptal, Rupak
- Visual beat grid with Sam highlighted


🎸 Chord Dictionary
- Searchable, filterable by category
- SVG fretboard diagram per chord


⏱ BPM Finder
- Tap-tempo (mouse or spacebar) with rolling average


📖 Tuning Reference
- Standard tunings for guitar, ukulele, violin, viola,
  cello, bass and mandolin


==================================================
DESIGN SYSTEM
==================================================


Theme:
Dark Music Studio


Colors:

Background:      #0B1020
Panel:           #111827
Primary:         #7C3AED
Secondary:       #06B6D4
Gold:            #F59E0B


Type:
Poppins (headings) + Inter (body)


==================================================
FUTURE DEVELOPMENT
==================================================


MusicBook v2.0
- React version
- Firebase login
- User profiles / saved projects


MusicBook v3.0
- AI vocal separation
- Raga detection
- Automatic music notation


==================================================
END OF README
==================================================
