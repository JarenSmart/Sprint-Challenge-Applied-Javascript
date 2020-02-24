// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Stduy the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.
const cardsContainer = document.querySelector(".cards-container");

axios
  .get("https://lambda-times-backend.herokuapp.com/articles")
  .then(article => {
    console.log(article.data.articles);
    let cardData = Object.values(article.data.articles);

    cardData.forEach(topicArr => {
      topicArr.forEach(articleObj => {
        cardsContainer.append(Cards(articleObj));
      });
    });
  })
  .catch(err => {
    console.log("There was an error: ", err);
  });

function Cards(response) {
  //elements
  const card = document.createElement("div");
  const cardHeadline = document.createElement("div");
  const author = document.createElement("div");
  const imgContainer = document.createElement("div");
  const newImg = document.createElement("img");
  const authorName = document.createElement("span");

  //content
  cardHeadline.textContent = response.headline;
  newImg.src = response.authorPhoto;
  authorName.textContent = `By ${response.authorName}`;

  //classes
  card.classList.add("card");
  cardHeadline.classList.add("headline");
  author.classList.add("author");
  imgContainer.classList.add("img-container");

  //structure
  card.appendChild(cardHeadline);
  card.appendChild(author);
  author.appendChild(imgContainer);
  imgContainer.appendChild(newImg);
  author.appendChild(authorName);

  return card;
}
