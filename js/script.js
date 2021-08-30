$(document).ready(function () {
   $('.commits-slider').slick({
      centerMode: true,
      variableWidth: true,
      arrows: true,
      dots: true,
      centerPadding: '30px',
      slidesToShow: 3,
      slidesToScroll: 1,
      mobileFirst: false,
      waitForAnimate: false,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               arrows: false,
               centerMode: false,
               slidesToShow: 2
            }
         },
         {
            breakpoint: 768,
            settings: {
               centerMode: false,
               arrows: false,
               slidesToShow: 2
            }
         },
         {
            breakpoint: 600,
            settings: {
               centerMode: false,
               arrows: false,
               slidesToShow: 1
            }
         }

      ]

   });
});