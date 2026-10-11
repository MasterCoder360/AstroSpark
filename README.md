<div align="center">

# AstroSparkOS

**A web-based desktop environment that sparks the galaxy! And runs in your browser**

Coded by Raahil for the [Hack Club Stardance](https://hackclub.com) and [Hack Club Beest](https://hackclub.com) WebOS Jam

![HTML](https://img.shields.io/badge/HTML-5-E34F26?style=flat&logo=html5&logoColor=white&labelColor=1f2937)
![CSS](https://img.shields.io/badge/CSS-3-1572B6?style=flat&logo=css3&logoColor=white&labelColor=1f2937)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat&logo=javascript&logoColor=F7DF1E&labelColor=1f2937)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=flat&logo=leaflet&logoColor=white&labelColor=1f2937)

</div>

---

## About

AstroSparkOS is a web-based operating system programmed by Raahil. It includes 11 apps inlcuding the Who Am I app, a window system, glassy UI, and an animated startup boot. Only the ISS tracker calls an API, but other than that, it is mainly self-contained saving all peferences to localStorage.

---

## Features

### Desktop Environment
- **Window system** — drag, minimize, maximize, and control with macOS-inspired buttons
- **Dock** — open app indicator dots, cursor-hover magnification
- **Top bar** — clock, date, motto, AstroSparkOS Who Am I app open button


### Visual Design

- **Glassmorphism windows:** Draggable, resizable-feeling windows with frosted-glass blur, soft shadows and rounded corners
- **macOS-style dock:** A floating glass dock with icons that grow and lift on hover, a dot under each open app
- **Custom SVG icons:** Every app icon is generated in code as a gradient tile with a white glyph
- **Space theme:** An animated black hole wallpaper and a deep navy and blue palette. The wallpaper can be switched in Settings.
- **Personalization:** Window tint, wallpaper, window opacity, dock icon size, 12/24-hour clock and reduced motion.
- **Boot sequence:** A startup screen with the logo, a progress bar and status messages before the desktop fades in.
- **Consistent dark UI:** Every app uses the same dark panels with the preferred tint,
- **Responsive:** On narrow screens the windows, dock and ISS stats rearrange.

---

## Built-in Apps

| App | Description |
|-----|-------------|
| **About Me** | Profile card with avatar, bio, tags, and social links |
| **Terminal** | Fake shell (`AstroShell`) with 8 commands |
| **Calculator** | Basic calculator with keyboard support |
| **Browser** | Embedded web browser |
| **ISS Tracker** | Calls API and maps to locate live ISS location |
| **Settings** | Tint colors (3 options), wallpaper (5 options) , Window opacity slider, dock size (3 options), clock modes, reset defaults button|
| **Welcome** | Explaination of features app |
| **Flexbox Froggy** | Iframe of Flexbox Froggy, helps build understanding in divs |
| **Notes** | Note-taking app that saves to localStorage. |
| **Calendar** | Client-side calendar that can save events to localStorage |
| **File Cabinet** | File viewer that views saved files from localStorage |


### Terminal Commands

```
help          Views all available commands
about         About AstroSparkOS
neofetch      System info
date          Current date and time
echo [text]   Repeats given text
clear         Clear terminal syntax
apps          Tells all built-in apps
open [app]    Opens the given app
iss           Tells ISS location
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, flexbox, grid, glass effect) |
| Language | Vanilla JavaScript (ES6+), no framework or build step |
| Maps | Leaflet 1.9.4, loaded from the unpkg CDN |
| Map Tiles | Esri World Street Map |
| Live Data | wheretheiss.at API (ISS position, altitude and speed, polled every 5 seconds) |
| Icons | Inline SVG generated in JavaScript (gradient tile with a white glyph) |
| Storage | localStorage (settings, notes, calendar events) |
| Embedded Apps | iframe (Flexbox Froggy, AstroBrowser) |
| Assets | Animated GIF and JPEG wallpapers, PNG logo |

---

## Architecture

```
AstroSpark/
├── index.html              # Entry point: top bar, dock container, boot screen, loads Leaflet and script.js
├── style.css               # Glass windows, dock, boot screen, per-app styles, tint variables
├── script.js               # All the logic
│   ├── Boot sequence       # Progress bar and status messages, then fade-out
│   ├── Settings            # Saved options (tint, wallpaper, opacity, dock size, clock), applied on load
│   ├── Clock               # Top-bar time, follows the clock settings
│   ├── ICONS / iconSVG()   # Generates the gradient SVG icons for the dock and launcher
│   ├── APPS                # One entry per app, each with a build() function
│   │   ├── launcher        # App grid
│   │   ├── welcome         # Intro window
│   │   ├── whoami          # Profile window, opened from the top bar (not in the dock)
│   │   ├── froggy          # Flexbox Froggy in an iframe
│   │   ├── iss             # Live ISS map with Leaflet and telemetry stats
│   │   ├── browser         # Iframe browser with back, forward and reload
│   │   ├── notes           # Notepad saved to localStorage
│   │   ├── calc            # Calculator
│   │   ├── calendar        # Monthly calendar and event list
│   │   ├── files           # File Cabinet shortcuts
│   │   ├── settings        # System Settings window
│   │   └── terminal        # AstroShell with a handful of commands
│   ├── Window manager      # Create, focus, minimize, maximize and close windows
│   ├── Dock                # Builds the dock and tracks which apps are open
│   └── Dragging            # Moves windows by their title bar
├── AstroSparkIcon.png      # Logo on the boot screen
├── Blackhole.gif           # Default animated wallpaper
├── BlackHole2.gif          # Alternate animated wallpaper
├── Starburst.gif           # Alternate animated wallpaper
└── BlackHole.jpeg          # Still wallpaper and image in the Welcome window
```

---

### Getting Started

```bash
# Clone the repository
git clone https://github.com/MasterCoder360/AstroSpark.git
cd AstroSpark

# Open it directly in your browser
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux

# Or run a local server (recommended)
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## Deployment

### Deployment

AstroSparkOS is a fully static site, so no backend is required.

**GitHub Pages** (recommended):
1. Push the project to a GitHub repository, with `index.html` in the root folder
2. Go to **Settings → Pages**
3. Under **Build and deployment**, set the source to **Deploy from a branch**
4. Choose the `main` branch and the `/ (root)` folder, then click **Save**
5. Wait a minute or two, and your site goes live!

**Other options**: Netlify, Cloudflare Pages, Vercel — any static host works.

---


## Project Info

| | |
|---|---|
| **Made by** | Raahil Aalam |
| **Contact** | raahilaalam0804@gmail.com |
| **GitHub** | [MasterCoder360](https://github.com/MasterCoder360) |
| **Built for** | [Hack Club Stardance](https://hackclub.com) WebOS Jam |

---

<div align="center">

**AstroSparkOS v1.0.0** — made with HTML, CSS, JavaScript, and a lot of space

</div>