'use strict';
//-----------constantes
const input = document.querySelector('.js-input');
const searchButton = document.querySelector('.js-button-search');
const resetButton = document.querySelector('.js-button-reset');

const drinkList = document.querySelector('.js-drinkList');

let urlServer = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input.value}`;

//------------eventos
searchButton.addEventListener('click', handleClickSearchButton);

//--------------funciones
function paintDrinks() {
  let html = '';
  for (const drinkItem of drinks) {
    html += `<li class="drinksLi">`;
    html += `<h2><h4>This is:</h4> ${drinkItem.strDrink}</h2>`;
    html += `<img class="drinksImages" src='${drinkItem.strDrinkThumb}'/>`;
    html += `</li>`;
  }
  drinkList.innerHTML = html;
}

let drinks = [];

fetch(urlServer)
  .then((response) => response.json())
  .then((data) => {
    //console.log(data.drinks);
    drinks = data.drinks;
    paintDrinks();
  });

function handleClickSearchButton(event) {
  event.preventDefault();
}
