// --- Realistic Boot Sequence Controller ---
window.addEventListener("load", () => {
  const startupScreen = document.getElementById("startupScreen");
  const progressBar = document.getElementById("bootProgressBar");
  const statusText = document.getElementById("bootStatusText");

  if (!startupScreen || !progressBar || !statusText) return;

  const bootSequence = [
    { progress: 15, text: "Loading kernel and system memory..." },
    { progress: 38, text: "Mounting virtual file system..." },
    { progress: 60, text: "Calibrating quantum gravitational matrix..." },
    { progress: 85, text: "Starting window manager and desktop dock..." },
    { progress: 100, text: "Welcome to AstroSparkOS!" }
  ];

  let step = 0;
  const interval = setInterval(() => {
    if (step < bootSequence.length) {
      progressBar.style.width = bootSequence[step].progress + "%";
      statusText.textContent = bootSequence[step].text;
      step++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        startupScreen.classList.add("fade-out");
      }, 400); // Brief pause at 100% before fading out
    }
  }, 450); // Speed of each boot step
});

// --- Live OS Clock Functionality ---
function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
    if(timeText) timeText.innerHTML = currentTime;
}
setInterval(updateTime, 1000);
updateTime(); 

// Window Component State Selectors
const launcherWindow = document.getElementById("launcherWindow");
const welcomeWindow = document.getElementById("welcome");
const vscodeWindow = document.getElementById("vscodeWindow");
const nasaWindow = document.getElementById("nasaWindow");
const browserWindow = document.getElementById("browserWindow");

const closeLauncher = document.getElementById("launcherClose");
const closeWelcome = document.getElementById("welcomeclose");
const closeVSCode = document.getElementById("vscodeClose");
const closeNASA = document.getElementById("nasaClose");
const closeBrowser = document.getElementById("browserClose");

const osTrigger = document.getElementById("osTrigger");
const dockLauncher = document.getElementById("dockLauncher");
const dockWelcome = document.getElementById("dockWelcome");
const dockVSCode = document.getElementById("dockVSCode");
const dockNASA = document.getElementById("dockNASA");
const dockBrowser = document.getElementById("dockBrowser");

// Browser Elements
const browserUrlInput = document.getElementById("browserUrlInput");
const browserFrame = document.getElementById("browserFrame");
const browserGo = document.getElementById("browserGo");
const browserRefresh = document.getElementById("browserRefresh");

// Helper to hide all primary application windows and remove active dock highlights
function hideAllApps() {
  welcomeWindow.style.display = "none";
  vscodeWindow.style.display = "none";
  nasaWindow.style.display = "none";
  browserWindow.style.display = "none";
  launcherWindow.style.display = "none";
  dockWelcome.classList.remove("active-app");
  dockVSCode.classList.remove("active-app");
  dockNASA.classList.remove("active-app");
  dockBrowser.classList.remove("active-app");
  dockLauncher.classList.remove("active-app");
}

// App Launcher Handler Function
function launchApp(appName) {
  launcherWindow.style.display = "none";
  dockLauncher.classList.remove("active-app");
  if (appName === 'welcome') dockWelcome.click();
  if (appName === 'vscode') dockVSCode.click();
  if (appName === 'nasa') dockNASA.click();
  if (appName === 'browser') dockBrowser.click();
}

// Window Swapping Protocol: Open Launcher
dockLauncher.addEventListener("click", function() {
  const isVisible = launcherWindow.style.display === "block";
  if (isVisible) {
    launcherWindow.style.display = "none";
    dockLauncher.classList.remove("active-app");
  } else {
    launcherWindow.style.top = "50%";
    launcherWindow.style.left = "50%";
    launcherWindow.style.transform = "translate(-50%, -50%)";
    launcherWindow.style.display = "block";
    dockLauncher.classList.add("active-app");
    launcherWindow.style.zIndex = 100;
  }
});

// Window Swapping Protocol: Open Welcome Page
dockWelcome.addEventListener("click", function() {
  hideAllApps();
  welcomeWindow.style.top = "50%";
  welcomeWindow.style.left = "50%";
  welcomeWindow.style.transform = "translate(-50%, -50%)";
  welcomeWindow.style.display = "block";
  dockWelcome.classList.add("active-app");
  welcomeWindow.style.zIndex = 100;
});

// Window Swapping Protocol: Open Flexbox Froggy
dockVSCode.addEventListener("click", function() {
  hideAllApps();
  vscodeWindow.style.top = "50%";
  vscodeWindow.style.left = "50%";
  vscodeWindow.style.transform = "translate(-50%, -50%)";
  vscodeWindow.style.display = "block";
  dockVSCode.classList.add("active-app");
  vscodeWindow.style.zIndex = 100;
});

// Window Swapping Protocol: Open NASA Tracker
dockNASA.addEventListener("click", function() {
  hideAllApps();
  nasaWindow.style.top = "50%";
  nasaWindow.style.left = "50%";
  nasaWindow.style.transform = "translate(-50%, -50%)";
  nasaWindow.style.display = "block";
  dockNASA.classList.add("active-app");
  nasaWindow.style.zIndex = 100;
});

// Window Swapping Protocol: Open Browser
dockBrowser.addEventListener("click", function() {
  hideAllApps();
  browserWindow.style.top = "50%";
  browserWindow.style.left = "50%";
  browserWindow.style.transform = "translate(-50%, -50%)";
  browserWindow.style.display = "block";
  dockBrowser.classList.add("active-app");
  browserWindow.style.zIndex = 100;
});

// Browser URL Navigation Handlers
function navigateBrowser() {
  let url = browserUrlInput.value.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }
  browserFrame.src = url;
}

if (browserGo) browserGo.addEventListener("click", navigateBrowser);
if (browserUrlInput) {
  browserUrlInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") navigateBrowser();
  });
}
if (browserRefresh) {
  browserRefresh.addEventListener("click", function() {
    browserFrame.contentWindow.location.reload();
  });
}

// Close Button Action Handlers
if (closeLauncher) closeLauncher.addEventListener("click", (e) => { e.stopPropagation(); launcherWindow.style.display = "none"; dockLauncher.classList.remove("active-app"); });
if (closeWelcome) closeWelcome.addEventListener("click", (e) => { e.stopPropagation(); welcomeWindow.style.display = "none"; dockWelcome.classList.remove("active-app"); });
if (closeVSCode) closeVSCode.addEventListener("click", (e) => { e.stopPropagation(); vscodeWindow.style.display = "none"; dockVSCode.classList.remove("active-app"); });
if (closeNASA) closeNASA.addEventListener("click", (e) => { e.stopPropagation(); nasaWindow.style.display = "none"; dockNASA.classList.remove("active-app"); });
if (closeBrowser) closeBrowser.addEventListener("click", (e) => { e.stopPropagation(); browserWindow.style.display = "none"; dockBrowser.classList.remove("active-app"); });

if (osTrigger) osTrigger.addEventListener("click", () => dockWelcome.click());

// --- Draggable Window Logic for All Windows ---
document.querySelectorAll('.draggable-window').forEach(windowBox => {
  const header = windowBox.querySelector('.window-drag-handle');
  if (!header) return;

  let isDragging = false;
  let startX, startY, initialLeft, initialTop;

  header.addEventListener('mousedown', (e) => {
    if (e.target.title === "Close") return;
    
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;

    const rect = windowBox.getBoundingClientRect();
    windowBox.style.transform = "none";
    windowBox.style.left = rect.left + "px";
    windowBox.style.top = rect.top + "px";

    initialLeft = rect.left;
    initialTop = rect.top;

    document.querySelectorAll('.window-box').forEach(w => w.style.zIndex = 10);
    windowBox.style.zIndex = 100;

    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    windowBox.style.left = (initialLeft + dx) + 'px';
    windowBox.style.top = (initialTop + dy) + 'px';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
});