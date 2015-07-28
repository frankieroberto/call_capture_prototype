$(document).ready(function() {


  var currentPage = 0

  function transitionPage(pages) {
    currentPage += pages;
    $('#multi-page-form').css('margin-left', -(currentPage * 100) + 'vw');
  }


  $('#previous').click(function() {
    transitionPage(-1);
  })

  $('#next').click(function() {
    transitionPage(1);
  })

  $('form').submit(function() {return false;})

  $('.button-advance').click(function() {
    transitionPage(1);
  })

  $('.textfield-advance').keyup(function(e){
    if(e.keyCode == 13) {
      transitionPage(1);
    }
  });

})