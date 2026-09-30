window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
  // Mobile navbar burger toggle
  $(".navbar-burger").click(function() {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  // Ensure teaser video autoplays muted by default
  var video = document.getElementById("teaser");
  if (video) {
    video.muted = true;
    var playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(function(error) {
        console.log("Autoplay was prevented:", error);
      });
    }
  }
});
