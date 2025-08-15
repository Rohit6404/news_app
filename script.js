const apiKey = "165a040295a14f659eb8c53c27ed7fd8";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

// news fetch ho jaegi so, fetch basically ek asynchronous operation hota h jo apka kisi news api server pr rakha hua h woha se news aati h apke paas toh thora time lgta h toh apko thora promise mil jaega jisse aap await kr skte ho

async function fetchNews(query){
    // fetch is a library that returns promise(so await used) so async & await func used here
    const res = await fetch(`${url}${query}&apiKey=${apiKey}`);
    const data = await res.json();
    console.log(data);

    bindData(data.articles)
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = '';

    articles.forEach((article) => {
        if(!article.urlToImage) return;   // jis news me image nhi h woh news nhi dikhana h
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img')
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSource = cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-desc')


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    //agr hum ipl me click kre toh active class ipl me rhe and uske baad finance me click kre toh woh active class ipl se remove ho kr finance me chla jae active class
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}


const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    //jb hum search krenge aur uske baad phir active class select kiye and then phir search kiye toh active class active rhega toh usko hatane ke liye niche ka code
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});






