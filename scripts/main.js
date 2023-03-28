//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
const input = document.querySelector("input");
const submitBtn = document.querySelector("button");
const previousBtn = document.querySelector("#up");
const nextBtn = document.querySelector("#down");

let currentDrink;
let index = 0;



function fetchData(drink, index) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then((res) => res.json())
    .then((data) => {
        document.querySelector('main').style.display = 'flex'
      document.querySelector("h2").innerText = data.drinks[index].strDrink;
      document.querySelector("img").src = data.drinks[index].strDrinkThumb;
      document.querySelector(".instructions").innerHTML =
        data.drinks[index].strInstructions;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

submitBtn.addEventListener("click", function () {
  index = 0;
  currentDrink = input.value;
  fetchData(currentDrink, index);
});

nextBtn.addEventListener("click", function () {
  index++;
  fetchData(currentDrink, index);
});

previousBtn.addEventListener("click", function () {
  index--;
  fetchData(currentDrink, index);
});
