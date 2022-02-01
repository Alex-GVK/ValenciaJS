const form = document.querySelector(".form");
const formTextInput = document.querySelector(".form__text");
const formButtonInput = document.querySelector(".form__btn");
const notFoundNews = document.querySelector(".without-info");
const group = document.querySelector(".group");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputValueBtn = formTextInput.value;
  localStorage.setItem('topicNews', JSON.stringify(inputValueBtn));
  console.log(inputValueBtn);
  if (inputValueBtn === "") {
    alert("Нужно ввести ключевое слово");
    return;
  } else if (group.classList.contains("group--disabled")) {
    group.classList.remove("group--disabled");
  }

  formTextInput.onchange = function () {
    const formColumn = document.querySelectorAll(".item-group");
    for (let i = 0; i < formColumn.length; i++) {
      if (formColumn[i].classList.contains('item-group')) {
        formColumn[i].remove();
        console.log('erre', formColumn[i]);
      } else {
        createNewsCard()
      }
    }
    if (group.classList.contains("group--active")) {
      group.classList.remove("group--active");
    }
    if (notFoundNews.classList.contains(".without-info--active")) {
      notFoundNews.remove();
      // notFoundNews.classList.add("without-info--disabled");
      
    }
  };

  createCirclePreloader();
  // createPreloaderWithoutInfo();

  const preloader = document.querySelector(".preloader");

  const apiKey = "7b6944c7dcee48669d9b0f45a147bab1";

  const currentDate = new Date();
  const pastDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

  const urlNews = `https://nomoreparties.co/news/v2/everything?q=${inputValueBtn}&from=${pastDate}&to=${currentDate}&sortBy=publishedAt&pageSize=100&apiKey=${apiKey}`

  async function fetchNews() {
    const response = await fetch(urlNews);

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

      const notFoundNews = document.querySelector(".without-info");

      if (news.length === 0) {
        notFoundNews.classList.remove("without-info--disabled");
        group.classList.add("group--disabled");
      } else {
        notFoundNews.classList.add("without-info--disabled");
      }

      articleNews.length = 0;
      newsUrl.length = 0;
      newsImg.length = 0;
      newsPublished.length = 0;
      newsTitle.length = 0;
      newsDescription.length = 0;
      newsSourceName.length = 0;

      news.forEach((article) => {
        articleNews.push(article);
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

    const itemGroupCard = document.createElement("a");
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

const articleNews = [];
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

  const itemGroup = document.querySelectorAll(".item-group");

  for (let i = 0; i < itemGroup.length; i++) {
    const itemAttribute = itemGroup[i].getAttribute("href");
    if (itemAttribute === "undefined") {
      itemGroup[i].remove();
    } else if (itemGroup.length >= articleNews.length) {
      groupBtn.classList.add("group__btn--disabled");
    }
  }
});

// History of Github commits

const COMMITS_URL = `https://api.github.com/repos/Alex-GVK/ValenciaJS/commits`;

function createCommitsCard() {
  const commitsSlider = document.querySelector(".commits-slider");
  for (let i = 0; i <= 19; i++) {
    const sliderItemInner = document.createElement("a");
    sliderItemInner.className = "item-inner";
    commitsSlider.append(sliderItemInner);

    const itemInnerDate = document.createElement("div");
    itemInnerDate.className = "item-inner__date";

    const itemInnerRow = document.createElement("div");
    itemInnerRow.className = "item-inner__row";

    const itemInnerRowImage = document.createElement("div");
    itemInnerRowImage.className = "item-inner__row-image";
    const itemInnerImg = document.createElement("img");
    itemInnerImg.className = "item-inner__row-img";
    itemInnerRowImage.append(itemInnerImg);

    const itemInnerBox = document.createElement("div");
    itemInnerBox.className = "item-inner__box";
    const itemInnerBoxTitle = document.createElement("div");
    itemInnerBoxTitle.className = "item-inner__box-title";
    const itemInnerBoxSubtitle = document.createElement("div");
    itemInnerBoxSubtitle.className = "item-inner__box-subtitle";
    const itemInnerBoxAncor = document.createElement("a");
    itemInnerBoxAncor.className = "item-inner__box-link";
    itemInnerBoxSubtitle.append(itemInnerBoxAncor);

    const itemInnerText = document.createElement("div");
    itemInnerText.className = "item-inner__txt";

    itemInnerBox.append(itemInnerBoxTitle, itemInnerBoxSubtitle);

    itemInnerRow.append(itemInnerRowImage, itemInnerBox);
    sliderItemInner.append(itemInnerDate, itemInnerRow, itemInnerText);
  }
}
createCommitsCard();

const getAllCommits = () => {
  const result = fetch(COMMITS_URL);

  result
    .then((response) => {
      return response.json();
    })
    .then((commits) => {
      // console.log("commits", commits);

      const commitUrl = [];
      const commitName = [];
      const commitEmail = [];
      const commitDate = [];
      const commitMessage = [];
      const commitAvatar = [];

      for (let i = 0; i < 19; i++) {
        commitUrl.push(commits[i].html_url);
        commitName.push(commits[i].commit.author.name);
        commitEmail.push(commits[i].commit.author.email);
        commitDate.push(commits[i].commit.author.date);
        commitMessage.push(commits[i].commit.message);
        commitAvatar.push(commits[i].author.avatar_url);
      }

      function getDateCommitUrl() {
        const urlCommits = document.querySelectorAll(".item-inner");

        for (let i = 0; i < urlCommits.length; i++) {
          urlCommits[i].setAttribute("href", commitUrl[i]);
          urlCommits[i].setAttribute("target", "_blank");
        }
      }
      getDateCommitUrl();

      function getDateCommitName() {
        const nameCommits = document.querySelectorAll(".item-inner__box-title");
        for (let i = 0; i < nameCommits.length; i++) {
          nameCommits[i].textContent = commitName[i];
        }
      }
      getDateCommitName();

      function getDateCommitEmail() {
        const emailCommits = document.querySelectorAll(".item-inner__box-link");
        for (let i = 0; i < emailCommits.length; i++) {
          emailCommits[i].textContent = commitEmail[i];
        }
      }
      getDateCommitEmail();

      function getDateCommitDate() {
        const dateCommits = document.querySelectorAll(".item-inner__date");
        for (let i = 0; i < dateCommits.length; i++) {
          const commitTime = commitDate[i];
          const fotmateCommitDate = new Date(commitTime).toLocaleDateString(
            "ru-RU",
            { year: "numeric", month: "long", day: "numeric" }
          );
          const prunFormateCommitDate = fotmateCommitDate.slice(0, -3);
          const breakFormateItemDate = prunFormateCommitDate.split(" ");
          const correctCommitDate = prunFormateCommitDate.replace(
            breakFormateItemDate[1],
            breakFormateItemDate[1] + ","
          );
          dateCommits[i].textContent = correctCommitDate;
        }
      }
      getDateCommitDate();

      function getDateCommitMessage() {
        const messageCommits = document.querySelectorAll(".item-inner__txt");
        for (let i = 0; i < messageCommits.length; i++) {
          messageCommits[i].textContent = commitMessage[i];
        }
      }
      getDateCommitMessage();

      function getDateCommitAvatar() {
        const avatarCommits = document.querySelectorAll(".item-inner__row-img");
        for (let i = 0; i < avatarCommits.length; i++) {
          avatarCommits[i].setAttribute("src", commitAvatar[i]);
        }
      }
      getDateCommitAvatar();
    })
    .catch((error) => {
      console.log("error", error);
    });
};
getAllCommits();

// slider

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
          slidesToShow: 14,
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

// analytics for the every day

const dateAnalyticsDays = [];

for (let i = 0; i < 7; i++) {
  const dateDays = new Date(new Date().getTime() - (i * 24 * 60 * 60 * 1000)).toLocaleDateString('sv-SE');

  dateAnalyticsDays.push(dateDays);
}
console.log(dateAnalyticsDays);

const apiKey = "7b6944c7dcee48669d9b0f45a147bab1";

const inputValueBtn = formTextInput.value;
localStorage.setItem('topicNews', JSON.stringify(inputValueBtn));
console.log(inputValueBtn);

const urlAnalyticsDays = [];

for (let i = 0; i < 7; i++) {
  const urlDays = `https://nomoreparties.co/news/v2/everything?q=${inputValueBtn}&from=${dateAnalyticsDays}&to=${dateAnalyticsDays}&sortBy=publishedAt&pageSize=100&apiKey=${apiKey}`;

  urlAnalyticsDays.push(urlDays);
}
console.log(urlAnalyticsDays);

const allAnalyticsDays = [];
const getAnalyticsDays = () => {
  const requests = urlAnalyticsDays.map(url => fetch(url));
  Promise.all(requests)
    .then((responses) => {
      const results = responses.map((data) => data.json());
      return Promise.all(results);
    })
    .then((allDays) => {
      allDays.forEach(el => {
        let allDaysDate = el.articles;
        allAnalyticsDays.push(allDaysDate);
        localStorage.setItem('analyticsDays', JSON.stringify(allAnalyticsDays))
      })
    })
}