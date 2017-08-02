/* global $ */
var currentPage = 0;
var PAGE_SIZE = 4;
var base;
var fotoTemplate = $('#fotoTemplate')[0];
var container = $('.photo__items');

getPhoto();

function getPhoto () {
  $.get('js/template.json', function (data) {
    base = data;
    renderPhoto(base, 0, true);
  });
}

function renderPhoto (base, currentPage, replace) {
  if (replace) {
    container.empty();
  }
  var fragment = $(document.createDocumentFragment());
  var from = currentPage * PAGE_SIZE;
  var to = from + PAGE_SIZE;
  var sliceBase = base.slice(from, to);
  $.each(sliceBase, function (key, value) {
    var fotoItem = fotoTemplate.content.children[0].cloneNode(true);
    $(fotoItem).find('.photo__name').text(value.name);
    $(fotoItem).find('.photo__author span').text(value.author);
    $(fotoItem).find('.photo__like b').text(value.likes);
    $(fotoItem).find('.photo__mobile').attr('src', value.photoMobile);
    $(fotoItem).find('.photo__tablet').attr('srcset', value.photoTablet);
    $(fotoItem).find('.photo__desktop').attr('srcset', value.photoDesktop);
    fragment.append(fotoItem);
  });
  container.append(fragment);
}

$(window).on('scroll', function () {
  clearTimeout(scrollTimeout);
  var scrollTimeout = setTimeout(function () {
    var videoCord = $('.video img')[0].getBoundingClientRect();
    var viewportSize = window.innerHeight;
    if (videoCord.top <= viewportSize) {
      if (currentPage < Math.ceil(base.length / PAGE_SIZE)) {
        renderPhoto(base, ++currentPage, false);
      }
    }
  }, 100);
});
