console.log('\'Allo \'Allo!');

jQuery(document).ready(function() {
    $('#carousel-see_samples').carousel({
  interval: 0
})

$('#carousel-see_samples.carousel .item').each(function(){
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));
  
 if (next.next().length>0) {
    next.next().children(':first-child').clone().appendTo($(this));
  }
  else {
  	$(this).siblings(':first').children(':first-child').clone().appendTo($(this));
  }
});
});

