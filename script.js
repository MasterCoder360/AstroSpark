// ---------- Boot sequence ----------
window.addEventListener("load", () => {
  const screen = document.getElementById("startupScreen");
  const bar = document.getElementById("bootProgressBar");
  const text = document.getElementById("bootStatusText");
  const steps = [
    [15, "Loading kernel and system memory..."],
    [38, "Mounting virtual file system..."],
    [60, "Loading desktop services..."],
    [85, "Starting window manager and desktop dock..."],
    [100, "Welcome to AstroSparkOS!"],
  ];
  let i = 0;
  const timer = setInterval(() => {
    if (i < steps.length) { bar.style.width = steps[i][0] + "%"; text.textContent = steps[i][1]; i++; }
    else { clearInterval(timer); setTimeout(() => screen.classList.add("fade-out"), 300); }
  }, 300);
});

// ---------- Clock ----------
const clockEl = document.getElementById("timeElement");
const tick = () => { clockEl.textContent = new Date().toLocaleString(); };
setInterval(tick, 1000); tick();

// ---------- App icons: generated SVG (gradient tile + white glyph) ----------
const ICONS = {
  launcher: ["#fb7185", "#be123c", '<path d="M12 2.5c3.2 2.2 5 5.2 5 9.5l-2 4.5H9L7 12.5c0-4.3 1.8-7.3 5-9.5z"/><circle cx="12" cy="10" r="1.7"/><path d="M7.5 13.5L4 17l3.5-.5M16.5 13.5L20 17l-3.5-.5M10 19.5l2 2.5 2-2.5"/>'],
  welcome:  ["#f472b6", "#a21caf", '<path fill="#fff" stroke="none" d="M12 2l2.3 7.7L22 12l-7.7 2.3L12 22l-2.3-7.7L2 12l7.7-2.3z"/>'],
  froggy:   ["#4ade80", "#15803d", '<circle cx="12" cy="14" r="7"/><circle cx="7.5" cy="7.5" r="2.5"/><circle cx="16.5" cy="7.5" r="2.5"/><path d="M8 16.5q4 3 8 0"/>'],
  iss:      ["#60a5fa", "#1d4ed8", '<rect x="9" y="9" width="6" height="6" rx="1"/><rect x="1.5" y="10" width="6" height="4"/><rect x="16.5" y="10" width="6" height="4"/><path d="M12 9V4.5M10 4.5h4M7.5 12H9M15 12h1.5"/>'],
  browser:  ["#38bdf8", "#0369a1", '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>'],
  notes:    ["#fbbf24", "#d97706", '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3.5"/>'],
  calc:     ["#a78bfa", "#6d28d9", '<rect x="5" y="3" width="14" height="18" rx="2"/><rect x="8" y="6" width="8" height="3"/><g fill="#fff" stroke="none"><circle cx="9" cy="13" r="1"/><circle cx="12" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><circle cx="9" cy="17" r="1"/><circle cx="12" cy="17" r="1"/><circle cx="15" cy="17" r="1"/></g>'],
  calendar: ["#fb7185", "#be123c", '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 10h16M8 14h2M14 14h2M8 17h2"/>'],
  files: ["#38bdf8", "#0369a1", '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'],  
   settings: ["#94a3b8", "#334155", '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.93 4.93l2.12 2.12m9.9 9.9 2.12 2.12m0-14.14-2.12 2.12m-9.9 9.9-2.12 2.12"/>'],
  terminal: ["#475569", "#0f172a", '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 10l3 2-3 2M12 15h5"/>'],
};
let gradN = 0;
function iconSVG(id) {
  const [c1, c2, glyph] = ICONS[id], g = "ig" + gradN++;
  return `<svg viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="48" height="48" rx="11" fill="url(#${g})"/><rect width="48" height="22" rx="11" fill="#fff" opacity=".12"/><g transform="translate(12 12)" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${glyph}</g></svg>`;
}

// ---------- App definitions ----------
// Each app: title, icon, desc, size, and build(container) -> optional { onShow, onHide }
const APPS = {
  launcher: {
    title: "App Launcher", icon: "🚀", w: 520, h: 420, hidden: true,
    build(c) {
      c.innerHTML = '<div class="launcher-grid"></div>';
      const grid = c.firstChild;
      Object.entries(APPS).filter(([, a]) => !a.hidden).forEach(([id, a]) => {
        const item = document.createElement("div");
        item.className = "launcher-item";
        item.innerHTML = `<div class="launcher-icon">${iconSVG(id)}</div><div class="launcher-title">${a.title}</div><div class="launcher-desc">${a.desc}</div>`;
        item.onclick = () => { closeWin("launcher"); openWin(id); };
        grid.appendChild(item);
      });
    },
  },

  welcome: {
    title: "AstroSpark", icon: "✨", desc: "Introduction to AstroSparkOS", w: 440, h: 400,
    build(c) {
      c.innerHTML = `<div class="pad"><h1>Welcome to AstroSpark WebOS!</h1><h2>Introduction</h2>
        <p>AstroSpark is a small browser-based desktop with a collection of useful tools and space-themed apps. Use the dock to launch an app, drag a window by its title bar, or open the launcher to see everything available.</p>
        <img src="./BlackHole.jpeg" alt="Black Hole"></div>`;
    },
  },

  froggy: {
    title: "Flexbox Froggy", icon: "🐸", desc: "Learn CSS Flexbox interactively", w: 800, h: 550,
    build(c) {
      c.innerHTML = '<iframe src="https://flexboxfroggy.com/" title="Flexbox Froggy"></iframe>';
    },
  },

  iss: {
    title: "ISS Tracker", icon: "🛰️", desc: "Live ISS position on a detailed world map", w: 820, h: 680,
    build(c) {
      c.innerHTML = `<div class="iss">
        <div class="iss-toolbar"><div><strong>ISS / LIVE TRACKING</strong><span class="iss-live"><i></i> LIVE TELEMETRY</span></div>
          <button class="iss-recenter">Recenter</button></div>
        <div class="iss-map" role="application" aria-label="Interactive map showing the International Space Station"></div>
        <div class="iss-stats"></div>
        <div class="iss-footer"><span class="iss-status">Connecting to telemetry…</span><span>Map © OpenStreetMap contributors</span></div>
        <div class="iss-links"><a class="nasa-btn" target="_blank" rel="noopener" href="https://spotthestation.nasa.gov/">Spot The Station ↗</a>
        <a class="nasa-btn" target="_blank" rel="noopener" href="https://eyes.nasa.gov/" >NASA Eyes 3D ↗</a></div></div>`;
      const mapEl = c.querySelector(".iss-map"), stats = c.querySelector(".iss-stats");
      const status = c.querySelector(".iss-status");
      let map, marker, footprint, trailLine, trail = [], last = null, timer = null, alive = true;
      const cell = (k, v) => `<div class="iss-stat"><span>${k}</span><b>${v}</b></div>`;
      function initMap() {
        if (map || !window.L) return;
        map = L.map(mapEl, { worldCopyJump: true, zoomControl: true, minZoom: 2 }).setView([15, 0], 2);


L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 19,
    attribution: "Tiles &copy; Esri"
  }
).addTo(map);


        const issIcon = L.divIcon({ className: "iss-map-icon", html: '<span>🛰</span>', iconSize: [34,34], iconAnchor: [17,17] });
        marker = L.marker([0,0], { icon: issIcon, title: "International Space Station" }).addTo(map)
          .bindTooltip("International Space Station", { direction: "top", offset: [0,-12] });
        footprint = L.circle([0,0], { radius: 2200000, color: "#60a5fa", weight: 1, fillColor: "#60a5fa", fillOpacity: .10 }).addTo(map);
        trailLine = L.polyline([], { color: "#f59e0b", weight: 2, opacity: .9 }).addTo(map);
        if (last) updateMap();
        setTimeout(() => map && map.invalidateSize(), 80);
      }
      function updateMap() {
        if (!map || !last) return;
        const pos = [last.latitude, last.longitude];
        marker.setLatLng(pos);
        footprint.setLatLng(pos);
        // Break the ground track at the antimeridian to avoid a line across the entire map.
        const segments = []; let segment = [];
        trail.forEach((p, i) => {
          if (i && Math.abs(p[1] - trail[i-1][1]) > 180) { if (segment.length) segments.push(segment); segment = []; }
          segment.push([p[0], p[1]]);
        });
        if (segment.length) segments.push(segment);
        trailLine.setLatLngs(segments);
      }
      async function poll() {
        try {
          const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544", { cache: "no-store" });
          if (!res.ok) throw new Error("Telemetry request failed (" + res.status + ")");
          last = await res.json();
          if (!Number.isFinite(last.latitude) || !Number.isFinite(last.longitude)) throw new Error("Invalid coordinates received");
          trail.push([last.latitude, last.longitude]);
          if (trail.length > 180) trail.shift();
          stats.innerHTML = cell("Latitude", last.latitude.toFixed(4) + "°") +
            cell("Longitude", last.longitude.toFixed(4) + "°") +
            cell("Altitude", last.altitude.toFixed(1) + " km") +
            cell("Orbital speed", Math.round(last.velocity).toLocaleString() + " km/h") +
            cell("Ground footprint", Math.round(last.footprint).toLocaleString() + " km") +
            cell("Last update", new Date(last.timestamp * 1000).toLocaleTimeString());
          status.textContent = "Telemetry updated " + new Date().toLocaleTimeString();
          initMap(); updateMap();
        } catch (e) { status.textContent = "Telemetry unavailable — retrying in 5 seconds"; }
      }
      c.querySelector(".iss-recenter").addEventListener("click", () => {
        if (map && last) map.setView([last.latitude, last.longitude], Math.max(map.getZoom(), 3));
      });
      initMap();
      poll();
      return {
        onShow() { alive = true; initMap(); if (map) setTimeout(() => map.invalidateSize(), 80); poll(); clearInterval(timer); timer = setInterval(() => { if (alive) poll(); }, 5000); },
        onHide() { alive = false; clearInterval(timer); }
      };
    },
  },

  browser: {
    title: "AstroBrowser", icon: "🌐", desc: "Surf the web in an iframe", w: 850, h: 600,
    build(c) {
      c.innerHTML = `<div class="browser-toolbar"><button data-a="back">←</button><button data-a="fwd">→</button><button data-a="reload">↻</button>
        <input value="https://hackclub.com" placeholder="Enter URL and press Enter..."><button data-a="go">Go</button><button data-a="tab" title="Open in new tab">↗</button></div>
        <iframe title="Internet Browser"></iframe>
        <div class="hint">Some sites refuse to be embedded in a frame. If a page stays blank, use ↗ to open it in a new tab.</div>`;
      const input = c.querySelector("input"), frame = c.querySelector("iframe");
      const back = c.querySelector('[data-a="back"]'), fwd = c.querySelector('[data-a="fwd"]');
      let hist = [], idx = -1;
      const norm = u => { u = u.trim(); return /^https?:\/\//i.test(u) ? u : "https://" + u; };
      function show() { frame.src = hist[idx]; input.value = hist[idx]; back.disabled = idx <= 0; fwd.disabled = idx >= hist.length - 1; }
      function go(u) { hist = hist.slice(0, idx + 1); hist.push(norm(u)); idx++; show(); }
      c.addEventListener("click", e => {
        const a = e.target.dataset && e.target.dataset.a;
        if (a === "go") go(input.value);
        if (a === "back" && idx > 0) { idx--; show(); }
        if (a === "fwd" && idx < hist.length - 1) { idx++; show(); }
        if (a === "reload") { const s = frame.src; frame.src = "about:blank"; setTimeout(() => (frame.src = s), 50); }
        if (a === "tab") window.open(norm(input.value), "_blank", "noopener");
      });
      input.addEventListener("keydown", e => { if (e.key === "Enter") go(input.value); });
      go(input.value);
    },
  },

  notes: {
    title: "Notes", icon: "📝", desc: "Quick notes, saved in your browser", w: 420, h: 420,
    build(c) {
      c.innerHTML = '<textarea class="notes" placeholder="Write something..."></textarea><div class="hint">Saved automatically</div>';
      const ta = c.querySelector("textarea"), hint = c.querySelector(".hint"), KEY = "astrospark.notes";
      try { ta.value = localStorage.getItem(KEY) || ""; } catch (e) { hint.textContent = "Storage unavailable: notes won't be saved"; }
      ta.addEventListener("input", () => { try { localStorage.setItem(KEY, ta.value); hint.textContent = "Saved"; } catch (e) {} });
      return { onShow: () => ta.focus() };
    },
  },

  calc: {
    title: "Calculator", icon: "🧮", desc: "Basic arithmetic", w: 300, h: 420,
    build(c) {
      const keys = ["C","(",")","/","7","8","9","*","4","5","6","-","1","2","3","+","0",".","⌫","="];
      c.innerHTML = `<div class="calc"><input readonly value="0"><div class="calc-keys">${keys.map(k => `<button>${k}</button>`).join("")}</div></div>`;
      const out = c.querySelector("input"); let expr = "";
      const set = v => { out.value = v || "0"; };
      c.querySelector(".calc-keys").addEventListener("click", e => {
        const k = e.target.textContent; if (e.target.tagName !== "BUTTON") return;
        if (k === "C") expr = "";
        else if (k === "⌫") expr = expr.slice(0, -1);
        else if (k === "=") {
          try {
            if (!/^[\d+\-*/.() ]+$/.test(expr)) throw 0;
            const r = Function('"use strict";return (' + expr + ")")();
            if (!isFinite(r)) throw 0;
            expr = String(parseFloat(r.toFixed(10)));
          } catch (err) { expr = ""; set("Error"); return; }
        } else expr += k;
        set(expr);
      });
    },
  },

  calendar: {
    title: "Calendar", icon: "📅", desc: "Monthly calendar and daily planner", w: 440, h: 470,
    build(c) {
      c.innerHTML = `<div class="calendar-app"><div class="calendar-head"><button data-step="-1">‹</button><strong></strong><button data-step="1">›</button></div><div class="calendar-grid"></div><div class="calendar-agenda"><b>Selected day</b><span class="selected-date"></span><input placeholder="Add an event and press Enter"></div></div>`;
      const head = c.querySelector(".calendar-head strong"), grid = c.querySelector(".calendar-grid"), selected = c.querySelector(".selected-date"), eventInput = c.querySelector("input");
      let view = new Date(), chosen = new Date(), events = {};
      try { events = JSON.parse(localStorage.getItem("astrospark.calendar") || "{}"); } catch (_) {}
      const key = d => `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
      function render() {
        head.textContent = view.toLocaleDateString(undefined,{month:"long",year:"numeric"});
        grid.innerHTML = ["Su","Mo","Tu","We","Th","Fr","Sa"].map(x=>`<div class="weekday">${x}</div>`).join("");
        const first = new Date(view.getFullYear(),view.getMonth(),1).getDay(), count = new Date(view.getFullYear(),view.getMonth()+1,0).getDate();
        for(let i=0;i<first;i++) grid.insertAdjacentHTML("beforeend",'<div class="calendar-empty"></div>');
        for(let n=1;n<=count;n++) { const d=new Date(view.getFullYear(),view.getMonth(),n); const b=document.createElement("button"); b.className="calendar-day"+(key(d)===key(chosen)?" selected":"")+(key(d)===key(new Date())?" today":""); b.textContent=n; if(events[key(d)]?.length)b.classList.add("has-event"); b.onclick=()=>{chosen=d;render();}; grid.appendChild(b); }
        selected.textContent = chosen.toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric",year:"numeric"});
        const old=c.querySelector(".event-list"); if(old)old.remove();
        const list=document.createElement("div"); list.className="event-list"; (events[key(chosen)]||[]).forEach(e=>{const p=document.createElement("p");p.textContent="• "+e;list.appendChild(p);}); c.querySelector(".calendar-agenda").appendChild(list);
      }
      c.querySelector(".calendar-head").addEventListener("click",e=>{const n=Number(e.target.dataset.step);if(n){view=new Date(view.getFullYear(),view.getMonth()+n,1);render();}});
      eventInput.addEventListener("keydown",e=>{if(e.key==="Enter"&&eventInput.value.trim()){(events[key(chosen)] ||= []).push(eventInput.value.trim());try{localStorage.setItem("astrospark.calendar",JSON.stringify(events));}catch(_){} eventInput.value="";render();}});
      render();
    }
  },
  files: {
    title: "File Cabinet", icon: "📁", desc: "Browse local AstroSpark workspace shortcuts", w: 500, h: 430,
    build(c) {
      const items = [
        ["AstroSparkIcon.png","Application icon","image","./AstroSparkIcon.png"],
        ["BlackHole.jpeg","Desktop wallpaper source","image","./BlackHole.jpeg"],
        ["Blackhole.gif","Animated wallpaper","image","./Blackhole.gif"],
        ["Notes","Personal notes","app","notes"],["Calendar","Events and reminders","app","calendar"],
        ["ISS Tracker","Live orbital map","app","iss"],["Terminal","AstroShell command line","app","terminal"]
      ];
      c.innerHTML = `<div class="files-app"><div class="files-path">⌂ &nbsp; Home / AstroSpark</div><div class="files-list"></div><p class="files-foot">Workspace shortcuts · browser-based storage</p></div>`;
      const list=c.querySelector(".files-list");
      items.forEach(([name,desc,type,target])=>{const row=document.createElement("button");row.className="file-row";row.innerHTML=`<span class="file-symbol">${type==="image"?"▧":type==="app"?"◈":"▤"}</span><span><b>${name}</b><small>${desc}</small></span><span class="file-arrow">↗</span>`;row.onclick=()=>{if(type==="app")openWin(target);else window.open(target,"_blank","noopener");};list.appendChild(row);});
    }
  },
  settings: {
    title: "System Settings", icon: "⚙️", desc: "Personalize the desktop", w: 440, h: 430,
    build(c) {
      c.innerHTML = `<div class="settings-app"><h2>Appearance</h2><p>Choose the desktop glass tint.</p><div class="setting-options"><button data-tint="blue">Ocean</button><button data-tint="violet">Nebula</button><button data-tint="neutral">Graphite</button></div><h2>Desktop</h2><label><input type="checkbox" class="motion-toggle"> Reduce interface motion</label><h2>System</h2><p>AstroSparkOS · Browser edition</p><button class="settings-reset">Reset appearance</button></div>`;
      const root=document.documentElement;
      const apply=t=>{root.dataset.tint=t;try{localStorage.setItem("astrospark.tint",t);}catch(_){}};
      try{apply(localStorage.getItem("astrospark.tint")||"blue");}catch(_){}
      c.querySelectorAll("[data-tint]").forEach(b=>b.onclick=()=>apply(b.dataset.tint));
      const motion=c.querySelector(".motion-toggle");try{motion.checked=localStorage.getItem("astrospark.reduceMotion")==="1";}catch(_){}
      motion.onchange=()=>{root.classList.toggle("reduce-motion",motion.checked);try{localStorage.setItem("astrospark.reduceMotion",motion.checked?"1":"0");}catch(_){}};
      try{root.classList.toggle("reduce-motion",localStorage.getItem("astrospark.reduceMotion")==="1");}catch(_){}
      c.querySelector(".settings-reset").onclick=()=>{apply("blue");motion.checked=false;root.classList.remove("reduce-motion");};
    }
  },
  terminal: {
    title: "Terminal", icon: "💻", desc: "AstroShell command line", w: 600, h: 400,
    build(c) {
      c.innerHTML = '<div class="term"><div class="term-out">AstroShell v1.0 — type "help" for commands.\n</div><div class="term-line"><span>astro@spark:~$</span><input spellcheck="false" autocomplete="off"></div></div>';
      const term = c.firstChild, out = c.querySelector(".term-out"), input = c.querySelector("input");
      const print = t => { out.textContent += t + "\n"; term.scrollTop = term.scrollHeight; };
      const cmds = {
        help: () => "Commands: help, about, date, echo <text>, apps, open <app>, iss, neofetch, clear",
        about: () => "AstroSparkOS: a spark in space, built with HTML, CSS and JS.",
        date: () => new Date().toString(),
        echo: a => a.join(" "),
        apps: () => Object.keys(APPS).filter(k => !APPS[k].hidden).join("  "),
        open: a => (APPS[a[0]] ? (openWin(a[0]), "Opening " + a[0] + "...") : "Unknown app. Try: apps"),
        neofetch: () => "  ✨  AstroSparkOS\n  OS: WebOS 2.0\n  Shell: AstroShell\n  Host: " + navigator.userAgent.split(" ").slice(-1)[0] + "\n  Screen: " + innerWidth + "x" + innerHeight,
        clear: () => { out.textContent = ""; return null; },
        iss: async () => {
          const r = await (await fetch("https://api.wheretheiss.at/v1/satellites/25544")).json();
          return `ISS is at ${r.latitude.toFixed(2)}°, ${r.longitude.toFixed(2)}° at ${Math.round(r.altitude)} km, ${Math.round(r.velocity)} km/h`;
        },
      };
      input.addEventListener("keydown", async e => {
        if (e.key !== "Enter") return;
        const line = input.value.trim(); input.value = ""; print("$ " + line);
        if (!line) return;
        const [cmd, ...args] = line.split(/\s+/);
        if (!cmds[cmd]) return print(cmd + ": command not found");
        try { const r = await cmds[cmd](args); if (r) print(r); } catch (err) { print("Error: " + err.message); }
      });
      term.addEventListener("click", () => { if (!getSelection().toString()) input.focus(); });
      return { onShow: () => setTimeout(() => input.focus(), 50) };
    },
  },
};

// ---------- Window manager ----------
const wins = {};          // id -> { el, hooks, open }
let zTop = 10, focusedId = null, cascade = 0;

function createWindow(id) {
  const a = APPS[id], el = document.createElement("div");
  el.className = "window-box";
  el.style.width = a.w + "px"; el.style.height = a.h + "px";
  el.innerHTML = `<div class="window-drag-handle"><div class="window-controls"><button class="win-close" title="Close" aria-label="Close">×</button><button class="win-minimize" title="Minimize" aria-label="Minimize">−</button><button class="win-maximize" title="Maximize" aria-label="Maximize">□</button></div><p class="window-header-title">${a.title}</p><div class="header-spacer"></div></div><div class="app-container"></div>`;
  const hooks = a.build(el.querySelector(".app-container")) || {};
  const off = (cascade++ % 6) * 28;
  el.style.left = Math.max(0, (innerWidth - a.w) / 2 + off - 70) + "px";
  el.style.top = Math.max(40, (innerHeight - a.h) / 2 + off - 40) + "px";
  document.body.appendChild(el);
  el.addEventListener("mousedown", () => focusWin(id));
  el.querySelector(".win-close").addEventListener("click", e => { e.stopPropagation(); closeWin(id); });
  el.querySelector(".win-minimize").addEventListener("click", e => { e.stopPropagation(); minimizeWin(id); });
  el.querySelector(".win-maximize").addEventListener("click", e => { e.stopPropagation(); toggleMaximize(id); });
  makeDraggable(el, id);
  return (wins[id] = { el, hooks, open: false });
}

function focusWin(id) {
  const w = wins[id]; if (!w) return;
  Object.values(wins).forEach(x => x.el.classList.remove("focused"));
  w.el.classList.add("focused"); w.el.style.zIndex = ++zTop; focusedId = id; renderDock();
}

function openWin(id) {
  const w = wins[id] || createWindow(id);
  const wasOpen = w.open;
  w.el.style.display = "flex"; w.open = true;
  if (!wasOpen && w.hooks.onShow) w.hooks.onShow();
  focusWin(id);
}

function minimizeWin(id) {
  const w = wins[id]; if (!w || !w.open) return;
  w.el.style.display = "none"; w.open = false; w.minimized = true;
  w.el.classList.remove("focused");
  if (w.hooks.onHide) w.hooks.onHide();
  if (focusedId === id) {
    focusedId = null;
    const next = Object.entries(wins).filter(([, x]) => x.open).sort((a, b) => Number(b[1].el.style.zIndex) - Number(a[1].el.style.zIndex))[0];
    if (next) focusWin(next[0]);
  }
  renderDock();
}
function toggleMaximize(id) {
  const w = wins[id]; if (!w) return;
  if (!w.restoreRect) {
    const r = w.el.getBoundingClientRect();
    w.restoreRect = { left: w.el.style.left || r.left + "px", top: w.el.style.top || r.top + "px", width: w.el.style.width, height: w.el.style.height };
    w.el.style.left = "8px"; w.el.style.top = "40px";
    w.el.style.width = Math.max(280, innerWidth - 16) + "px";
    w.el.style.height = Math.max(220, innerHeight - 112) + "px";
    w.el.classList.add("maximized");
  } else {
    Object.assign(w.el.style, w.restoreRect); w.restoreRect = null;
    w.el.classList.remove("maximized");
  }
  focusWin(id);
}

function closeWin(id) {
  const w = wins[id]; if (!w || !w.open) return;
  w.el.style.display = "none"; w.open = false; w.el.classList.remove("focused");
  if (w.hooks.onHide) w.hooks.onHide();
  if (focusedId === id) {
    const next = Object.entries(wins).filter(([, x]) => x.open).sort((a, b) => b[1].el.style.zIndex - a[1].el.style.zIndex)[0];
    focusedId = null; if (next) focusWin(next[0]);
  }
  renderDock();
}

// Dock: closed -> open; open but behind -> raise; focused -> close
function dockClick(id) {
  const w = wins[id];
  if (!w || !w.open) openWin(id);
  else if (focusedId === id) closeWin(id);
  else focusWin(id);
}

const dock = document.getElementById("dock");
Object.entries(APPS).forEach(([id, a]) => {
  const d = document.createElement("div");
  d.className = "dock-icon"; d.id = "dock-" + id; d.title = a.title; d.innerHTML = iconSVG(id);
  d.onclick = () => dockClick(id);
  dock.appendChild(d);
});
function renderDock() {
  Object.keys(APPS).forEach(id => document.getElementById("dock-" + id).classList.toggle("active-app", !!(wins[id] && wins[id].open)));
}

// ---------- Dragging (one set of global listeners) ----------
let drag = null;
function makeDraggable(el, id) {
  el.querySelector(".window-drag-handle").addEventListener("mousedown", e => {
    if (e.target.closest(".window-controls")) return;
    const r = el.getBoundingClientRect();
    drag = { el, dx: e.clientX - r.left, dy: e.clientY - r.top };
    document.body.classList.add("dragging");
    e.preventDefault();
  });
}
document.addEventListener("mousemove", e => {
  if (!drag) return;
  drag.el.style.left = Math.min(innerWidth - 60, e.clientX - drag.dx) + "px";
  drag.el.style.top = Math.min(innerHeight - 40, Math.max(32, e.clientY - drag.dy)) + "px";
});
document.addEventListener("mouseup", () => { drag = null; document.body.classList.remove("dragging"); });

document.getElementById("osTrigger").addEventListener("click", () => openWin("welcome"));
openWin("welcome");