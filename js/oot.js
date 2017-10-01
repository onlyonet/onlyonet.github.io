$(document).ready(function() {
  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $(document).on('click', 'a.page-scroll', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 1250, 'easeInOutExpo');
    event.preventDefault();
  });

  $(document).on('click', 'a.lead', function(event) {
    console.log('Lead clicked');
    fbq('track', 'Lead');
  });
});
