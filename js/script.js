$(document).ready(function () {
   $('.commits-slider').slick({
      centerMode: true,
      dots: true,
      centerPadding: '30px',
      slidesToShow: 3,
      slidesToScroll: 1,
      mobileFirst: false,
      centerMode: true,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               arrows: false,
               centerMode: true,
               centerPadding: '20px',
               slidesToShow: 2
            }
         },
         {
            breakpoint: 768,
            settings: {
               arrows: false,
               centerMode: true,
               centerPadding: '10px',
               slidesToShow: 2
            }
         },
         {
            breakpoint: 600,
            settings: {
               arrows: false,
               centerMode: true,
               centerPadding: '0px',
               slidesToShow: 1
            }
         }

      ]

   });
});