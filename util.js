window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||          // build into brower
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame || 

        function (callback,) {                        // set fps 1 frame per 1/60 of a sec (60fps)
            window.setTimeout(callback, 1000 / 60);
        }

})();