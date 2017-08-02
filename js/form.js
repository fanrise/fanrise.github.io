/* global $ */

$('.feedback__form').submit(function (event) {
  event.preventDefault();
  var data = $(this).serialize();
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/js/server.php',
    data: data,
    success: function (result) {
      $(this).html(result);
    }
  });
});
