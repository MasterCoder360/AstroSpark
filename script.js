// FIX: Changed "window" to "welcome" to match the HTML element ID
dragElement(document.getElementById("welcome"));  

function dragElement(element) {
  if (!element) return;

  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  if (document.getElementById(element.id + "header")) {
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    
    // Clear the center transformation matrix so it doesn't fight manual positioning
    element.style.transform = "none"; 
    
    initialX = e.clientX;
    initialY = e.clientY;
    
    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag; // FIX: Pointing to renamed function below
  }

  // FIX: Renamed from dragElement to elementDrag to avoid naming collision loop
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
