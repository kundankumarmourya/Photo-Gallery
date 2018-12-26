var fsGal_preloads = new Array();

$('document').ready(function() {

    $('.webcoderskull-view').css('display', 'flex').hide();

    // Make gallery objects clickable, also dynamic added objects
    $('body').on('click', '.webcoderskull', function(e) {
        fsGal_DisplayImage($(e.currentTarget));
    });
  
    preloadImage($('.webcoderskull')[0].dataset.url); // Preload the very first image

    // Display gallery
    function fsGal_DisplayImage(obj) {

        // Set current image
        title = obj.attr('title');
        alt = obj.attr('alt');
        if (!title) { title = alt; }
        imgElem = $('.webcoderskull-main');
        imgElem.attr('title', title);
        imgElem.attr('alt', alt);
        imgElem.attr('src', obj.attr('data-full'));
        $('.webcoderskull-view > h1').text(title);
        if (!title || title == '') { $('.webcoderskull-view > h1').fadeOut(); }
        else { $('.webcoderskull-view > h1').fadeIn(); }

        // Create buttons
        var current = $('.webcoderskull').index(obj);
        var prev = current - 1;
        var next = current + 1;
        if (prev >= 0) {
            $('.webcoderskull-view > .webcoderskull-prev').attr('data-img-index', prev);
        }
        if (next < $('.webcoderskull').length) {
            $('.webcoderskull-view > .webcoderskull-next').attr('data-img-index', next);
        }
        $('.webcoderskull-view').fadeIn(); // Display gallery

        // Wrap gallery
        if (current == $('.webcoderskull').length - 1)  { // Last image
            $('.webcoderskull-view > .webcoderskull-next').attr('data-img-index', 0);
        }
        else if (current == 0)  { // Last image
            $('.webcoderskull-view > .webcoderskull-prev').attr('data-img-index', $('.webcoderskull').length - 1);
        }
      
        preloadNextAndPrev(); // Preload next images

    }

    // Preload next and previous image
    function preloadNextAndPrev() {
        fsGal_preloads = new Array();
        // Previous
        index = $('.webcoderskull-view > .webcoderskull-prev').attr('data-img-index');
        elem = $($('.webcoderskull').get(index));
        img = elem.attr('data-full');
        preloadImage(img);
        // Next
        index = $('.webcoderskull-view > .webcoderskull-next').attr('data-img-index');
        elem = $($('.webcoderskull').get(index));
        img = elem.attr('data-full');
        preloadImage(img);
    }

    // Preload an image
    function preloadImage(source) {
      var preload = (new Image());
      preload.src = source
      fsGal_preloads.push(preload);
    }

    // Check if the image viewer is displayed
    function isViewerOpen() {
        return $('.webcoderskull-view').css('display') !== 'none'; // Can be block, flex...
    }

    // Gallery navigation
    $('.webcoderskull-view .webcoderskull-nav').click(function(e) {
        e.stopPropagation();
        if (isViewerOpen()) {
            var index = $(this).attr('data-img-index');
            var img = $($('.webcoderskull').get(index));
            fsGal_DisplayImage(img);
        }        
    });

    // Close gallery
    $('.webcoderskull-view').click(function(e) {
        $('.webcoderskull-view').fadeOut();
    });
    $('.webcoderskull-main').click(function(e) {
        e.stopPropagation();
    });

    // Keyboard navigation
    $('body').keydown(function(e) {
        if (e.keyCode == 37) { 
            $('.webcoderskull-view .webcoderskull-prev').click(); // Left arrow
        }
        else if(e.keyCode == 39) {
            $('.webcoderskull-view .webcoderskull-next').click(); // Right arrow
        }
        else if(e.keyCode == 27) {
            $('.webcoderskull-view .webcoderskull-close').click(); // ESC
        }
    });

    // Scroll navigation
    $(window).bind('mousewheel', function(e) {
        if (e.originalEvent.wheelDelta >= 0) { // Scroll up, go to previous image
            $('.webcoderskull-view .webcoderskull-prev').click();
        }
        else { // Scroll down, go to next image
            $('.webcoderskull-view .webcoderskull-next').click();
        }
    });

    // Slide navigation using touch swiping
    var touchstartX = 0;
    var touchendX = 0;
    var gestureZone = $('.webcoderskull-view')[0];

    // Listen to touch start
    gestureZone.addEventListener('touchstart', function(event) {
        touchstartX = event.changedTouches[0].screenX;
    }, false);

    // Listen to touch end
    gestureZone.addEventListener('touchend', function(event) {
        touchendX = event.changedTouches[0].screenX;
        handleGesture();
    }, false); 

    // Deterimine touch gesture direction
    function handleGesture() {
        if (touchendX <= touchstartX) { // Slide to left, go to next image
            $('.webcoderskull-view .webcoderskull-next').click();
        }
        if (touchendX >= touchstartX) { // Slide to right, go to previous image
            $('.webcoderskull-view .webcoderskull-prev').click();
        }
    }

});