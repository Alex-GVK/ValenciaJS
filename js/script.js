
async function fetchNews() {

   const response = await fetch('https://nomoreparties.co/news/v2/everything?q=apple&from=2021-08-27&to=currentData&sortBy=publishedAt&pageSize=100&apiKey=7b6944c7dcee48669d9b0f45a147bab1');
   
   const data = await response.json();
   return data;
   
}


fetchNews().then(response => {
   localStorage.setItem('news', JSON.stringify(response));

   let newsData = localStorage.getItem('news')

   newsData = JSON.parse(newsData);
   console.log(response);
})











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