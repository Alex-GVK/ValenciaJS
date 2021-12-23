const form = document.querySelector(".form");
const formTextInput = document.querySelector(".form__text");
const formButtonInput = document.querySelector(".form__btn");
// let newsCount = 0;
// console.log(newsCount);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputValueBtn = formTextInput.value;
  if (inputValueBtn === "") {
    alert("Нужно ввести ключевое слово");
    return;
  }

  const group = document.querySelector(".group");

  if (group.classList.contains("group--disabled")) {
    group.classList.remove("group--disabled");
  }

  createCirclePreloader();

  const preloader = document.querySelector(".preloader");

  const apiKey = "7b6944c7dcee48669d9b0f45a147bab1";

  const currentDate = new Date();
  const pastDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

  async function fetchNews() {
    const response = await fetch(
      `https://nomoreparties.co/news/v2/everything?q=${inputValueBtn}&from=${pastDate}&to=${currentDate}&sortBy=publishedAt&pageSize=100&apiKey=${apiKey}`
    );

    const data = await response.json();
    return data;
  }

  fetchNews()
    .then((response) => {
      localStorage.setItem("news", JSON.stringify(response));

      let newsData = localStorage.getItem("news");

      newsData = JSON.parse(newsData);
      console.log(newsData);

      let news = response.articles;

      // news.length += newsCount

      const notFoundNews = document.querySelector(".without-info");

      if (news.length === 0) {
        notFoundNews.classList.remove("without-info--disabled");
        group.classList.add("group--disabled");
      } else {
        notFoundNews.classList.add("without-info--disabled");
      }

      news.forEach((article) => {
        newsUrl.push(article.url);
        newsImg.push(article.urlToImage);
        newsPublished.push(article.publishedAt);
        newsTitle.push(article.title);
        newsDescription.push(article.description);
        newsSourceName.push(article.source.name);
      });

      getDateUrlArticle();
      getDateImgArticle();
      getDatePublishedArticle();
      getDateTitleArticle();
      getDateDescriptionArticle();
      getDateSourceNameArticle();
    })
    .catch(() => {
      alert(
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
      );
    })
    .finally(() => {
      preloader.classList.add("preloader--disabled");
    });
});

function createCirclePreloader() {
  const header = document.querySelector("header");
  const preloader = document.createElement("div");
  preloader.className = "preloader";
  const circlePreloader = document.createElement("div");
  circlePreloader.className = "circle-preloader";
  const textPreloader = document.createElement("p");
  textPreloader.className = "preloader-text";
  textPreloader.textContent = "Идет поиск новостей...";
  preloader.append(circlePreloader, textPreloader);
  header.after(preloader);
}
// createCirclePreloader();

function createPreloaderWithoutInfo() {
  const header = document.querySelector("header");
  const withoutInfo = document.createElement("div");
  withoutInfo.classList.add("without-info", "without-info--disabled");
  const withoutInfoImage = document.createElement("img");
  withoutInfoImage.className = "without-info__img";
  withoutInfoImage.src = "img/not-found.png";
  const withoutInfoTitle = document.createElement("div");
  withoutInfoTitle.className = "without-info__title";
  withoutInfoTitle.textContent = "Ничего не найдено";
  const withoutInfoText = document.createElement("div");
  withoutInfoText.className = "without-info__text";
  withoutInfoText.textContent =
    "К сожалению по вашему запросу ничего не найдено.";
  withoutInfo.append(withoutInfoImage, withoutInfoTitle, withoutInfoText);
  header.after(withoutInfo);
}
createPreloaderWithoutInfo();

function createNewsCard() {
  const cardsRow = document.querySelector(".group__row");
  for (let i = 0; i <= 2; i++) {
    const cardsColumn = document.createElement("div");
    cardsColumn.className = "group__column";
    cardsRow.append(cardsColumn);

    const itemGroupCard = document.createElement("div");
    itemGroupCard.className = "item-group";
    cardsColumn.append(itemGroupCard);

    const iconCard = document.createElement("div");
    iconCard.className = "item-group__icon";
    const imgCard = document.createElement("img");
    imgCard.className = "item-group__img";
    iconCard.append(imgCard);

    const dateCard = document.createElement("div");
    dateCard.className = "item-group__date";

    const titleCard = document.createElement("div");
    titleCard.className = "item-group__title";

    const textCard = document.createElement("div");
    textCard.className = "item-group__text";
    textCard.textContent = "";

    const websiteCard = document.createElement("div");
    websiteCard.className = "item-group__website";

    itemGroupCard.append(iconCard, dateCard, titleCard, textCard, websiteCard);
  }
}
createNewsCard();

const newsUrl = [];
const newsImg = [];
const newsPublished = [];
const newsTitle = [];
const newsDescription = [];
const newsSourceName = [];

function getDateUrlArticle() {
  const urlArticle = document.querySelectorAll(".item-group");

  for (let i = 0; i < urlArticle.length; i++) {
    urlArticle[i].setAttribute("href", newsUrl[i]);
    urlArticle[i].setAttribute("target", "_blank");
  }
}

function getDateImgArticle() {
  const imgArticle = document.querySelectorAll(".item-group__img");

  for (let i = 0; i < imgArticle.length; i++) {
    imgArticle[i].setAttribute("src", newsImg[i]);
  }
}

function getDatePublishedArticle() {
  const publishedArticle = document.querySelectorAll(".item-group__date");

  for (let i = 0; i < publishedArticle.length; i++) {
    const itemDate = newsPublished[i];
    const formateItemDate = new Date(itemDate).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const prunFormateItemDate = formateItemDate.slice(0, -3);
    const breakFormateItemDate = prunFormateItemDate.split(" ");
    const correctDate = prunFormateItemDate.replace(
      breakFormateItemDate[1],
      breakFormateItemDate[1] + ","
    );
    publishedArticle[i].textContent = correctDate;
  }
}

function getDateTitleArticle() {
  const titleArticle = document.querySelectorAll(".item-group__title");

  for (let i = 0; i < titleArticle.length; i++) {
    titleArticle[i].textContent = newsTitle[i];
  }
}

function getDateDescriptionArticle() {
  const descriptionArticle = document.querySelectorAll(".item-group__text");

  for (let i = 0; i < descriptionArticle.length; i++) {
    descriptionArticle[i].textContent = newsDescription[i];
  }
}

function getDateSourceNameArticle() {
  const sourceArticle = document.querySelectorAll(".item-group__website");

  for (let i = 0; i < sourceArticle.length; i++) {
    sourceArticle[i].textContent = newsSourceName[i];
  }
}

const groupBtn = document.querySelector(".group__btn");

groupBtn.addEventListener("click", function () {
  createNewsCard();

  getDateUrlArticle();
  getDateImgArticle();
  getDatePublishedArticle();
  getDateTitleArticle();
  getDateDescriptionArticle();
  getDateSourceNameArticle();

  //       const test = document.querySelectorAll('.item-group');
  // console.log(test.length);
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
