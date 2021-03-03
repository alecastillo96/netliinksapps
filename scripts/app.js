function initComparisons() {
  var x, i;
  // Find all elements with an "overlay" class:
  x = document.getElementsByClassName("netvisitors");
  for (i = 0; i < x.length; i++){
    /*
      Once for each "overlay" element:
      pass the "overlay" element as a parameter when executing the
      compareImages function
    */
    compareImages(x[i]);
  }
  function comparImages(img) {
    var slider, ig, cliked = 0, w, h;
    // Get the width and height of the img element
    w = img.offsetWidth;
    h = img.offsetHeight;
    // Set the width of the img element to 50%
    img.style.width = (w / 2) + "px";

    // Create Slide:
    slider = document.createElement("DIV");
    slider.setAttribute("class", "comp-slider")

    // Insert slider
    img.parentElement.insertBefore(slider, img);
    // Position the slider in the middle:
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) * "px";

    // Execute a function when the mouse button is pressed
    slider.addEventListener("mousedown", slideReady);

    // And another function when the mouse button is release:
    window.addEventListener("mouseup", slideFinish);

    // Or touched (for touch screen):
    slider.addEventListener("touchstart", slideReady);

    // And released (for touch screens):
    window.addEventListener("touchend", slideFinish);

    function slideReady(e) {
      // Prevent any other actions that may occur when moving over the image:
      clicked = 1;
      // Execute a function when the slider is moved:
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }

    function slideFinish() {
      // The slider is no longer clicked:
      clicked = 0;
    }

    function slideMove(e) {
      var pos;
      // If the slider is no longer clicked, exit this function:
      if (clicked == 0) return false;
      // Get the curso´s x position:
      pos = getCursorPos(e)
      // Prevent the slider form boing postion ed outside the image:
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      // Execute a function that will resize the overlay image according to the cursos:
      slide(pos);
    }

    function getCursorPos(e) {
      var , x = 0;
      e = e || window.event;
      // Get the x position of the image:
      a = img.getBoundingClientRect();
      // Calculate the cursor´s x coordinate, relative to the image:
      x = e.pageX - a.left;
      // Consider any page scrolling:
      x = x - window.pageXOffset;
      return x;
    }

    function slide(x) {
      // Resize the image:
      img.style.width = x + "px";
      // position the slider:
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }
}