// Блок запроса

const form = document.querySelector(".form");
const formTextInput = document.querySelector(".form__text");
const formButtonInput = document.querySelector(".form__btn");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputValueBtn = formTextInput.value;
  if (inputValueBtn === '') {
    alert("Нужно ввести ключевое слово");
    return
  }

   const group = document.querySelector(".group");

  if (group.classList.contains("group--disabled")) {
    group.classList.remove("group--disabled");
  }

  const apiKey = "7b6944c7dcee48669d9b0f45a147bab1";

  const currentDate = new Date();
  const pastDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);


// запросы к newsapi

  async function fetchNews() {
    const response = await fetch(
      `https://nomoreparties.co/news/v2/everything?q=${inputValueBtn}&from=${pastDate}&to=${currentDate}&sortBy=publishedAt&pageSize=100&apiKey=${apiKey}`
    );

    const data = await response.json();
    return data;
  }

// Карточка

  fetchNews()
    .then((response) => {
      localStorage.setItem("news", JSON.stringify(response));

      let newsData = localStorage.getItem("news");

      newsData = JSON.parse(newsData);
      console.log(newsData);

      let news = response.articles;

      const newsUrl = [];
      const newsImg = [];
      const newsPublished = [];
      const newsTitle = [];
      const newsDescription = [];
      const newsSourceName = [];

      news.forEach((article) => {
        newsUrl.push(article.url);
        newsImg.push(article.urlToImage);
        newsPublished.push(article.publishedAt);
        newsTitle.push(article.title);
        newsDescription.push(article.description);
        newsSourceName.push(article.source.name);
      });

      const urlArticle = document.querySelectorAll(".item-group");

      for (let i = 0; i < urlArticle.length; i++) {
        urlArticle[i].setAttribute("href", newsUrl[i]);
        urlArticle[i].setAttribute("target", "_blank");
      }

      const imgArticle = document.querySelectorAll(".item-group__img");

      for (let i = 0; i < imgArticle.length; i++) {
        imgArticle[i].setAttribute("src", newsImg[i]);
      }

// Creat new format Date in item card

      function getDatePublishedAt() {
         const publishedArticle = document.querySelectorAll(".item-group__date");

         for (let i = 0; i < publishedArticle.length; i++) {
            const itemDate = newsPublished[i];
            const formateItemDate = new Date(itemDate).toLocaleDateString("ru-RU", {year: "numeric", month: "long", day: "numeric",});
            const prunFormateItemDate = formateItemDate.slice(0, -3)
            const breakFormateItemDate = prunFormateItemDate.split(" ");
            const correctDate = prunFormateItemDate.replace(breakFormateItemDate[1], breakFormateItemDate[1] + ",");
            publishedArticle[i].textContent = correctDate;
            
         }
      }
      getDatePublishedAt()

      const titleArticle = document.querySelectorAll(".item-group__title");

      for (let i = 0; i < titleArticle.length; i++) {
        titleArticle[i].textContent = newsTitle[i];
      }

      const descriptionArticle = document.querySelectorAll(".item-group__text");

      for (let i = 0; i < descriptionArticle.length; i++) {
        descriptionArticle[i].textContent = newsDescription[i];
      }

      const sourceArticle = document.querySelectorAll(".item-group__website");

      for (let i = 0; i < sourceArticle.length; i++) {
        sourceArticle[i].textContent = newsSourceName[i];
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

$(document).ready(function () {
  $(".commits-slider").slick({
    centerMode: true,
    variableWidth: true,
    arrows: true,
    dots: true,
    centerPadding: "30px",
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
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
          arrows: false,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: false,
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  });
});
