console.log('\'Allo \'Allo!');

$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{

    		0:{
            items:1
        },

        540:{
            items:1
        },

         667:{
            items:2
        },

        767:{
            items:2
        },

         967:{
            items:3
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
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },

        540:{
            items:1
        },
        
        667:{
            items:2
        },

        767:{
            items:2
        },

         967:{
            items:3
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


