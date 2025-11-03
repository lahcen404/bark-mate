const dogCard = document.querySelector(".dog-card");
const favDogs = document.querySelector(".fav-dogs");
const yesBtn = document.querySelector("#yes-btn");
const noBtn = document.querySelector("#no-btn");
const favsBtn = document.querySelector("#favs-btn");

const randomEn = Math.floor(Math.random() * 5) + 1;
const url = `https://api.api-ninjas.com/v1/dogs?energy=${randomEn}`;
const apiKey = "0e3aA7Ernkds8EdeB393oA==6LVI0buDPgtLfJqZ";

let likedDogs = [];
let currentDog = null;

function getDogs() {
  dogCard.innerHTML = `<h1>Loadiiing Dogs...</h1>`;

  fetch(url, {
    headers: { "X-Api-Key": apiKey },
  })
    .then((response) => response.json())
    .then((data) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      currentDog = data[randomIndex];

      dogCard.innerHTML = `
        <img src="${currentDog.image_link}" alt="dog">
        <p><strong>Name:</strong> ${currentDog.name}</p>
      `;
    })
    .catch((err) => {
      console.error(err);
      dogCard.innerHTML = `<h1>Error fetchiiiiing dog </h1>`;
    });
}

getDogs();

yesBtn.addEventListener("click", () => {
  if (currentDog) {
    likedDogs.push(currentDog);
    
    getDogs();
  }
  console.log(likedDogs);
});

noBtn.addEventListener("click", getDogs);

favsBtn.addEventListener("click", () => {
  favDogs.innerHTML = "<h2>Faav Dooogs </h2>"; 

  likedDogs.forEach((dog) => {
    favDogs.innerHTML += `
      <div class="fav-card">
        <img src="${dog.image_link}" alt="dog">
        <p>${dog.name}</p>
      </div>
    `;
  });
});
