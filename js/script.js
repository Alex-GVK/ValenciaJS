let search = document.querySelector('.search');
let searchTextInput = document.querySelector('.search__text');
let searchButtonInput = document.querySelector('.search__btn');

searchButtonInput.addEventListener('click', function () {
   
   let inpText = searchTextInput.value;
   
   let group = document.querySelector('.group');
   
   if (group.classList.contains('group--disabled')) {
      group.classList.remove('group--disabled')
   }

   async function fetchNews() {

   const response = await fetch(`https://nomoreparties.co/news/v2/everything?q=${inpText}&from=2021-08-27&to=currentData&sortBy=publishedAt&pageSize=100&apiKey=7b6944c7dcee48669d9b0f45a147bab1`);
   
   const data = await response.json();
   return data;
   
}
   
fetchNews().then(response => {
   localStorage.setItem('news', JSON.stringify(response));

   let newsData = localStorage.getItem('news')

   newsData = JSON.parse(newsData);
   console.log(response);


   let news = response.articles;

   let newsUrl = [];
   let newsImg = [];
   let newsPublished = [];
   let newsTitle = [];
   let newsDescription = [];
   let newsSourceName = [];

   news.forEach(article => {
      newsUrl.push(article.url);
      newsImg.push(article.urlToImage);
      newsPublished.push(article.publishedAt);
      newsTitle.push(article.title);
      newsDescription.push(article.description);
      newsSourceName.push(article.source.name);
      
   });

   let urlArticle = document.querySelectorAll('.item-group');
   
   for (let i = 0; i < urlArticle.length; i++) {
      urlArticle[i].setAttribute('href', newsUrl[i]);
      urlArticle[i].setAttribute('target', '_blank');
   }

   let imgArticle = document.querySelectorAll('.item-group__img');
   
   for (let i = 0; i < imgArticle.length; i++) {
      imgArticle[i].setAttribute('src', newsImg[i]);
   }

   let publishedArticle = document.querySelectorAll('.item-group__date');

   for (let i = 0; i < publishedArticle.length; i++) {
      publishedArticle[i].textContent = newsPublished[i];
   }
   
   let titleArticle = document.querySelectorAll('.item-group__title');

   for (let i = 0; i < titleArticle.length; i++) {
      titleArticle[i].textContent = newsTitlt[i];
   }

   let descriptionArticle = document.querySelectorAll('.item-group__text');

   for (let i = 0; i < descriptionArticle.length; i++) {
      descriptionArticle[i].textContent = newsDescription[i];
   }

   let sourceArticle = document.querySelectorAll('.item-group__website');

   for (let i = 0; i < sourceArticle.length; i++) {
      sourceArticle[i].textContent = newsSourceName[i];
   }


   
})

   .catch(error => (error));

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