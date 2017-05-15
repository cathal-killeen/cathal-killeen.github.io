// Agency Theme JavaScript

(function($) {
    "use strict"; // Start of use strict
    // variable for indicating autoscroll animation is currently taking place
    var autoscroll = false;

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    // $('a.page-scroll').bind('click', function(event) {
    //     event.preventDefault();
    //     //autoscroll = true;
    //     var $anchor = $(this);
    //     $('html, body').stop().animate({
    //         scrollTop: ($($anchor.attr('href')).offset().top)
    //     }, 1250, 'easeInOutExpo', function(){
    //         window.location.hash = $anchor.attr('href');
    //         setTimeout(function(){
    //             autoscroll = false;
    //         }, 0);
    //
    //     });
    // });

    // prevent jump on hashchange event
    // $(window).bind('hashchange', function(event) {
    //     //if(autoscroll){
    //         event.preventDefault();
    //     //}
    // });
    // $(window).on('hashchange', function(event) {
    //     if(autoscroll){
    //         event.preventDefault();
    //     }
    // });

    // detect direction user is scrolling -- WAAAAAY TOO EXPENSIVE
    // $(window).bind('mousewheel', function(event) {
    //     if (event.originalEvent.wheelDelta >= 0) {
    //         console.log('Scroll up');
    //         scroll = 'up';
    //     }
    //     else {
    //         console.log('Scroll down');
    //         scroll = 'down';
    //     }
    // });

    // $(document).bind('scroll',function(e){
    //     $('section').each(function(){
    //         if(
    //             //prevent this action while autoscroll animation is currently happening
    //             !autoscroll
    //             //begins before top
    //             && $(this).offset().top < window.pageYOffset + 10
    //             //but ends in visible area
    //             //+ 10 allows you to change hash before it hits the top border
    //             && $(this).offset().top + $(this).height() > window.pageYOffset + 10
    //         ){
    //             //console.log(window.location.hash);
    //             window.location.hash = $(this).attr('id');
    //         }
    //     });
    // });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){
            $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 120
        }
    })

})(jQuery); // End of use strict
