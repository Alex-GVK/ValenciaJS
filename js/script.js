
async function fetchNews() {

   const response = await fetch('https://nomoreparties.co/news/v2/everything?q=natura&from=2021-08-27&to=currentData&sortBy=publishedAt&pageSize=100&apiKey=7b6944c7dcee48669d9b0f45a147bab1');
   
   const data = await response.json();
   return data;
   
}
   
fetchNews().then(response => {
   localStorage.setItem('news', JSON.stringify(response));

   let newsData = localStorage.getItem('news')

   newsData = JSON.parse(newsData);
   console.log(response);
   
   for (let value of Object.values(newsData)) {
      console.log(Object.values(newsData)[2]);
   }

   let key;
   let content = Object.values(newsData)[2];

   for (key in content) {
      console.log(content[key]);
   }

   document.querySelector('.item-group__website').textContent = content[key].source.name
   document.querySelector('.item-group__title').textContent = content[key].title
   document.querySelector('.item-group__date').textContent = content[key].publishedAt
   document.querySelector('.item-group__text').textContent = content[key].description
   document.querySelector('.item-group__img').innerHTML = ` <img src = "${content[key].urlToImage}"> `
   
})
   .catch(error => (error));







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