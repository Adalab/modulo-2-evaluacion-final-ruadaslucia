'use strict';
//-----------constantes
const input = document.querySelector('.js-input');
const searchButton = document.querySelector('.js-button-search');
const resetButton = document.querySelector('.js-button-reset');
const drinkList = document.querySelector('.js-drinkList');

//unimos la url con el valor del input del usuario
let urlServer = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input.value}`;

//info array bebidas
let drinks = [];

//------------eventos
searchButton.addEventListener('click', handleClickSearchButton);
resetButton.addEventListener('click', handleClickResetButton);
//--------------funciones
function listenersDrinks() {
  const liDrinks = document.querySelectorAll('.js-drinks'); //cojemos cada li
  for (const item of liDrinks) {
    item.addEventListener('click', handleClickDrinks); //le asociamos a cada li el evento click
  }
}
function paintDrinks() {
  let html = '';
  for (const drinkItem of drinks) {
    html += `<li class="drinksLi js-drinks hiden"  id=${drinkItem.idDrink}>`;
    html += `<h2> ${drinkItem.strDrink}</h2>`;
    html += `<img class="drinksImages" src='${drinkItem.strDrinkThumb}'/>`;
    html += `<button class="favBtn">&#128147</button>`;
    html += `</li>`;
  }
  drinkList.innerHTML = html;
  listenersDrinks();
}

fetch(urlServer)
  .then((response) => response.json())
  .then((data) => {
    //console.log(data.drinks);
    drinks = data.drinks;
    paintDrinks();
  });

function handleClickDrinks(event) {
  console.log(event.currentTarget.idDrink);
}

function handleClickSearchButton(event) {
  event.preventDefault();
}
function handleClickResetButton(event) {
  event.preventDefault();
}
