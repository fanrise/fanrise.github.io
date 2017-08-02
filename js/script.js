/* global $ */

var links = $('.mainNav__links');
var toggle = $('.mainNav__toggle');

links.hide();
toggle.on('click', function () {
  $(this).toggleClass('mainNav__toggle--active');
  links.slideToggle();
});
