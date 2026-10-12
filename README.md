<div align="center">

# AstroSparkOS

![HTML](https://img.shields.io/badge/HTML-5-E34F26?style=flat&logo=html5&logoColor=white&labelColor=1f2937)
![CSS](https://img.shields.io/badge/CSS-3-1572B6?style=flat&logo=css3&logoColor=white&labelColor=1f2937)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat&logo=javascript&logoColor=F7DF1E&labelColor=1f2937)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=flat&logo=leaflet&logoColor=white&labelColor=1f2937)

</div>

---

## What even is this?

A web-based desktop os I built for [Hack Club Stardance](https://hackclub.com) and [Hack Club Beest](https://hackclub.com) WebOS Jam. It runs in your browser and has a space theme cause why not.

So I wanted to make a mock operating system that runs entirely in the browser. No backend, no build step, just HTML/CSS/JS. It's got 11 apps, a window manager, glassmorphism UI, and a boot sequence that's honestly way more dramatic than it needs to be.

The only app that actually calls an API is the ISS tracker (using wheretheiss.at). Everything else saves to localStorage. Pretty self-contained.

## The apps

- **Who Am I** - basically my profile card
- **Terminal** - fake shell called AstroShell with like 8 commands
- **Calculator** - does math
- **Browser** - iframe-based, some sites block it but working on it
- **ISS Tracker** - shows where the space station is right now
- **Settings** - change the tint, wallpaper, opacity, dock size, clock stuff
- **Welcome** - explains what's going on
- **Flexbox Froggy** - embedded iframe cause I learned divs from that game
- **Notes** - saves to localStorage
- **Calendar** - client-side calendar with events
- **File Cabinet** - shows saved files from localStorage

## Tech stuff

Just vanilla JS, no frameworks. Used Leaflet for the map. Everything's in one `script.js` file for convenience. The CSS is all in `style.css` with the glassmorphism effects.

## How to run it

```bash
git clone https://github.com/MasterCoder360/AstroSpark.git
cd AstroSpark
open index.html  # or just double click it
```
### Deploying
It's a static site so just push to GitHub and enable Pages. Or use Netlify, Vercel, or any other static site publisher.

### Who made this
Me, Raahil Aalam. I'm a student who codes stuff.

GitHub: MasterCoder360

Email: raahilaalam0804@gmail.com

Built for: Hack Club Stardance / Hack Club Beest WebOS Jam