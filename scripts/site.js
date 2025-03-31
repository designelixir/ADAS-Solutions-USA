//Import Mixpanel SDK
import mixpanel from "mixpanel-browser";
 
// Near entry of your product, init Mixpanel
mixpanel.init("ddf4a6eac4c6df2190408bc31c0b6e57", {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});

console.log("detected mixpanel")

(function() {
  'use strict';

  // Load all images via Squarespace's Responsive ImageLoader
  function loadAllImages() {
    var images = document.querySelectorAll('img[data-src]' );
    for (var i = 0; i < images.length; i++) {
      ImageLoader.load(images[i], {load: true});
    }
  }

  // The event subscription that loads images when the page is ready
  document.addEventListener('DOMContentLoaded', loadAllImages);

  // The event subscription that reloads images on resize
  window.addEventListener('resize', loadAllImages);

}());
