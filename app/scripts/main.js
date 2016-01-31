console.log('\'Allo \'Allo!');

$('.owl-carousel').owlCarousel({
    loop:true,
    margin:28,
    nav:true,
    responsive:{
    	0:{
            items:1
        },

        568:{
            items:1
        },        

        768:{
            items:2
        },         

        1024:{
            items:3
        },
        1366:{
            items:4
        },

        1920:{
            items:5
        }
    }
})

$('.owl-carousel-1').owlCarousel({
    loop:true,
    margin:30,
    nav:true,
    responsive:{
        0:{
            items:1
        },

        568:{
            items:1
        },       

        768:{
            items:2
        },         

        1024:{
            items:3
        },

        1366:{
            items:4
        },

        1920:{
            items:5
        }
    }
})

$('.owl-carousel-2').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    items:1,
    onInitialized: onCarouselInitializedCallback,
    onChanged: onCarouselChangedCallback
})

function onCarouselInitializedCallback(event) {
    var pagerEl = $(event.target).next();
    var countEl = pagerEl.find('.all');
    countEl.html(event.item.count);
    onCarouselChangedCallback(event);
}

function onCarouselChangedCallback(event) {
    var pagerEl = $(event.target).next();
    var currentEl = pagerEl.find('.current');
    currentEl.html(event.item.index - 1);
}


$('.search-button').click(function(){
    $('.search-wrap').show();
})




// Find all YouTube videos
var $allVideos = $("iframe[src^='<a href="http://www.youtube.com">http://www.youtube.com</a>']"),
  
    // The element that is fluid width
    $fluidEl = $("body");
  
// Figure out and save aspect ratio for each video
$allVideos.each(function() {
  
  $(this)
    .data('aspectRatio', this.height / this.width)
  
    // and remove the hard coded width/height
    .removeAttr('height')
    .removeAttr('width');
  
});
  
// When the window is resized
$(window).resize(function() {
  
  var newWidth = $fluidEl.width();
  
  // Resize all videos according to their own aspect ratio
  $allVideos.each(function() {
  
    var $el = $(this);
    $el
      .width(newWidth)
      .height(newWidth * $el.data('aspectRatio'));
  
  });
  
// Kick off one resize to fix all videos on page load
}).resize();

