/*
  2022 coded by @Sina-Shafiee
  No licence
*/

// api url
const BASE_URL = "https://www.superheroapi.com/api.php/10229795445613410/";

// selecting DOM elements
const refreshDiv = document.getElementById("refresh");
const heroImg = document.getElementById("hero-image");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const statsEl = document.getElementById("stats");
const heroNameEl = document.getElementById("hero-name");
const heroEyeEl = document.getElementById("hero-eye");
const heroHairEl = document.getElementById("hero-hair");
const heroGenderEl = document.getElementById("hero-gender");

/* 
    calling the api to post data on page load
    and on get new hero button press 
*/

const handleNewData = (id) => {
  fetch(`${BASE_URL}/${id}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      statsEl.innerHTML = postNewData(json);
    });
};
/* 
    calling api to hanld the search functionalty
*/

const searchSuperHero = (name) => {
  fetch(`${BASE_URL}/search/${name}`)
    .then((response) => response.json())
    .then((json) => {
      if (json.response === "success") {
        const hero = json.results[0];
        statsEl.innerHTML = postNewData(hero);
      } else {
        removeData(statsEl);
      }
    });
};

// emoji for hero stats :D

const statEmoji = {
  intelligence: "🏆",
  strength: "💪",
  speed: "⚡",
  durability: "✊",
  power: "🏋",
  combat: "⚔️"
};

/* 
    posting the fetched data on dom 
    on new hero button press and search button click
*/

const postNewData = (json) => {
  const addData = Object.keys(json.powerstats).map((state) => {
    return `<p class="dynamic-data">${statEmoji[state]} ${state} :     "${json.powerstats[state]}" </p>`;
  });
  heroImg.setAttribute("src", json.image.url);
  heroNameEl.textContent = json.name;
  heroEyeEl.textContent = json["appearance"]["eye-color"];
  heroHairEl.textContent = json["appearance"]["hair-color"];
  heroGenderEl.textContent = json["appearance"]["gender"];
  return addData.join(" ");
};

/* 
    if the search result was 404 this function
     will earse the dom elements
*/

const removeData = (elements) => {
  heroImg.setAttribute("src", "./images/404.svg");
  heroNameEl.textContent = "Not Found";
  heroEyeEl.textContent = "-";
  heroHairEl.textContent = "-";
  heroGenderEl.textContent = "-";
  return (elements.innerHTML = "");
};

/* 
    generating a random number 
    based on api total heros
*/

const randomHero = () => {
  const numberOfHeros = 732;
  return Math.floor(Math.random() * numberOfHeros) + 1;
};

//  new hero  button click handler
refreshDiv.onclick = () => handleNewData(randomHero());

// calling the search functionalty on search button press
searchBtn.onclick = () => searchSuperHero(searchInput.value);

//  page load content
window.onload = () => handleNewData(randomHero());
