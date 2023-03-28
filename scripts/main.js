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
      resetCard()
      let drinkData = data.drinks[index];
      document.querySelector("main").style.display = "flex";
      document.querySelector("h2").innerText = drinkData.strDrink;
      //add ingredients and quantities
      let ingredients = [];
      for (let i = 1; i < 10; i++) {
        if (drinkData[`strIngredient${i}`]) {
          drinkData[`strMeasure${i}`] !== null
            ? ingredients.push(
                `${drinkData[`strMeasure${i}`]} ${
                  drinkData[`strIngredient${i}`]
                }`
              )
            : ingredients.push(`${drinkData[`strIngredient${i}`]}`);
        }
      }
      displayIngredients(ingredients);
      document.querySelector("img").src = drinkData.strDrinkThumb;
      document.querySelector(".instructions").innerHTML =
        drinkData.strInstructions;
    //display arrows if necessary
    if (data.drinks[index + 1]){
      nextBtn.style.display = 'block'
    }
    if (data.drinks[index - 1]){
      previousBtn.style.display = 'block'
    }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function displayIngredients(ingredients) {
  ingredients.map((ingredient) => {
    document.querySelector(
      ".ingredients"
    ).innerHTML += `<li>${ingredient}</li>`;
  });
}

function resetCard(){
  document.querySelector(".ingredients").innerHTML = "";
  nextBtn.style.display = 'none'
  previousBtn.style.display = 'none'
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
