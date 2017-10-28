$(document).ready(function() {
  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $(document).on('click', 'a.page-scroll', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 1250, 'easeInOutExpo');
    event.preventDefault();
  });

  var url = window.location.href;
  if(url.indexOf('?thankyou=1') != -1) {
    $('#thankYouModal').modal('show');
    // Remove the query params
    history.pushState(null, null, '/');
  }
});
