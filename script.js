// ---------- Boot sequence ----------
window.addEventListener("load", () => {
  const screen = document.getElementById("startupScreen");
  const bar = document.getElementById("bootProgressBar");
  const text = document.getElementById("bootStatusText");
  const steps = [
    [15, "Loading kernel and system memory..."],
    [38, "Mounting virtual file system..."],
    [60, "Calibrating quantum gravitational matrix..."],
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
        <p>Hello Galaxy! Open the launcher (first icon in the dock) to explore apps. Click a window to focus it, drag its title bar to move it.</p>
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
    title: "ISS Tracker", icon: "🛰️", desc: "Live International Space Station position", w: 760, h: 620,
    build(c) {
      c.innerHTML = `<div class="iss"><canvas width="1000" height="500"></canvas>
        <div class="iss-stats"></div>
        <a class="nasa-btn" target="_blank" href="https://spotthestation.nasa.gov/">Spot The Station</a>
        <a class="nasa-btn" target="_blank" href="https://eyes.nasa.gov/" style="background:#059669;margin-left:8px">NASA Eyes (3D)</a>
        <p class="iss-note">Live data from api.wheretheiss.at, refreshed every 5 s. Map is a simplified outline.</p></div>`;
      const cv = c.querySelector("canvas"), g = cv.getContext("2d"), stats = c.querySelector(".iss-stats");
      const X = lon => (lon + 180) / 360 * cv.width, Y = lat => (90 - lat) / 180 * cv.height;
      const LAND = [
        [[-168,66],[-140,70],[-95,72],[-80,63],[-62,58],[-55,50],[-70,42],[-76,35],[-81,25],[-97,26],[-105,22],[-96,16],[-83,9],[-80,8],[-90,15],[-110,24],[-117,32],[-124,40],[-125,49],[-140,59],[-152,58],[-165,60]],
        [[-80,8],[-60,10],[-50,0],[-35,-6],[-40,-22],[-48,-28],[-58,-38],[-65,-42],[-68,-55],[-74,-50],[-72,-30],[-70,-18],[-81,-5]],
        [[-17,21],[-10,32],[10,37],[32,31],[43,12],[51,11],[40,-5],[40,-16],[33,-27],[20,-35],[12,-17],[9,-1],[-8,4],[-17,14]],
        [[-10,36],[-9,43],[-2,48],[5,53],[10,57],[20,70],[40,68],[70,73],[110,77],[140,72],[180,68],[170,60],[160,55],[140,52],[142,46],[130,35],[122,30],[120,22],[108,10],[100,2],[104,10],[95,17],[80,8],[73,18],[66,25],[57,25],[50,30],[56,18],[43,13],[35,28],[28,36],[22,37],[12,44],[3,43]],
        [[114,-22],[130,-12],[142,-11],[153,-26],[147,-38],[135,-35],[115,-34]],
        [[-55,60],[-45,60],[-20,70],[-20,82],[-60,82],[-72,76]],
        [[-180,-70],[180,-70],[180,-90],[-180,-90]],
      ];
      let trail = [], last = null, timer = null;

      function draw() {
        g.clearRect(0, 0, cv.width, cv.height);
        g.strokeStyle = "rgba(255,255,255,0.08)"; g.lineWidth = 1;
        for (let lon = -180; lon <= 180; lon += 30) { g.beginPath(); g.moveTo(X(lon), 0); g.lineTo(X(lon), cv.height); g.stroke(); }
        for (let lat = -90; lat <= 90; lat += 30) { g.beginPath(); g.moveTo(0, Y(lat)); g.lineTo(cv.width, Y(lat)); g.stroke(); }
        g.fillStyle = "#1e3a5f";
        LAND.forEach(poly => { g.beginPath(); poly.forEach(([lo, la], i) => i ? g.lineTo(X(lo), Y(la)) : g.moveTo(X(lo), Y(la))); g.closePath(); g.fill(); });
        g.strokeStyle = "#f59e0b"; g.lineWidth = 2;
        for (let i = 1; i < trail.length; i++) {
          if (Math.abs(trail[i][0] - trail[i - 1][0]) > 180) continue; // skip antimeridian jumps
          g.beginPath(); g.moveTo(X(trail[i - 1][0]), Y(trail[i - 1][1])); g.lineTo(X(trail[i][0]), Y(trail[i][1])); g.stroke();
        }
        if (!last) return;
        const x = X(last.longitude), y = Y(last.latitude), r = last.footprint / 2 / 111;
        g.beginPath(); g.ellipse(x, y, r * cv.width / 360, r * cv.height / 180, 0, 0, 7);
        g.fillStyle = "rgba(96,165,250,0.15)"; g.fill(); g.strokeStyle = "#60a5fa"; g.stroke();
        g.beginPath(); g.arc(x, y, 7, 0, 7); g.fillStyle = "#fff"; g.shadowColor = "#f59e0b"; g.shadowBlur = 18; g.fill(); g.shadowBlur = 0;
        g.font = "bold 18px Arial"; g.fillStyle = "#fff"; g.fillText("ISS", x + 12, y - 10);
      }

      async function poll() {
        try {
          const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
          if (!res.ok) throw new Error(res.status);
          last = await res.json();
          trail.push([last.longitude, last.latitude]); if (trail.length > 120) trail.shift();
          const cell = (k, v) => `<div>${k}<b>${v}</b></div>`;
          stats.innerHTML = cell("Latitude", last.latitude.toFixed(3) + "°") + cell("Longitude", last.longitude.toFixed(3) + "°") +
            cell("Altitude", last.altitude.toFixed(1) + " km") + cell("Speed", Math.round(last.velocity).toLocaleString() + " km/h") +
            cell("Visibility", last.visibility) + cell("Updated", new Date(last.timestamp * 1000).toLocaleTimeString());
          draw();
        } catch (e) { stats.textContent = "Couldn't reach the ISS API. Check your connection; retrying..."; }
      }
      draw();
      return {
        onShow() { poll(); clearInterval(timer); timer = setInterval(poll, 5000); },
        onHide() { clearInterval(timer); },
        getLast: () => last,
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

  terminal: {
    title: "Terminal", icon: "💻", desc: "AstroShell command line", w: 600, h: 400,
    build(c) {
      c.innerHTML = '<div class="term"><div class="term-out">AstroShell v1.0. Type "help" to begin.\n</div><div class="term-line"><span>astro@spark:~$</span><input spellcheck="false" autocomplete="off"></div></div>';
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
  el.innerHTML = `<div class="window-drag-handle"><div class="win-close" title="Close">✕</div><p class="window-header-title">${a.title}</p><div class="header-spacer"></div></div><div class="app-container"></div>`;
  const hooks = a.build(el.querySelector(".app-container")) || {};
  const off = (cascade++ % 6) * 28;
  el.style.left = Math.max(0, (innerWidth - a.w) / 2 + off - 70) + "px";
  el.style.top = Math.max(40, (innerHeight - a.h) / 2 + off - 40) + "px";
  document.body.appendChild(el);
  el.addEventListener("mousedown", () => focusWin(id));
  el.querySelector(".win-close").addEventListener("click", e => { e.stopPropagation(); closeWin(id); });
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
    if (e.target.closest(".win-close")) return;
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