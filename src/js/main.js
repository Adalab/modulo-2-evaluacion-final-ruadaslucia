'use strict';
//-----------constantes
const input = document.querySelector('.js-input');
const searchButton = document.querySelector('.js-button-search');
const resetButton = document.querySelector('.js-button-reset');
const drinkList = document.querySelector('.js-drinkList');

//unimos la url con el valor del input del usuario
let urlServer = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input.value}`;

//------------eventos botones
searchButton.addEventListener('click', handleClickSearchButton);
resetButton.addEventListener('click', handleClickResetButton);

//--------------funciones
function listenersDrinks() {
  const liDrinks = document.querySelectorAll('.js-drinks'); //cojemos cada li
  for (const item of liDrinks) {
    item.addEventListener('click', handleClickDrinks); //le asociamos a cada li el evento click
  }
}
//array que contiene la de bebidas
let drinks = [];
//-----funcion para pintar cada bebida en el html
function paintDrinks() {
  let html = '';

  for (const drinkItem of drinks) {
    let classFavorite = '';
    const favoriteFoundIndex = favorites.findIndex((fav) => {
      // versi está en favs
      return fav.idDrink === drinkItem.idDrink;
    });

    if (favoriteFoundIndex !== -1) {
      classFavorite = 'colorFav';
    } else {
      classFavorite = '';
    }
    html += `<li class="drinksLi js-drinks ${classFavorite}" id="${drinkItem.idDrink}">`;
    html += `<h2> ${drinkItem.strDrink}</h2>`;
    html += `<img class="drinksImages" src='${drinkItem.strDrinkThumb}'/>`;
    html += `<button class="favBtn">&#128147</button>`;
    html += `</li>`;
  }
  drinkList.innerHTML = html;
  listenersDrinks();
}

//----listado favoritos
let favorites = [];

function handleClickDrinks(event) {
  //console.log(event.target.getAttribute('id'));
  const idDrinkSelected = event.currentTarget.idDrink;

  const drinkFound = drinks.find((fav) => {
    //buscar la info de la bebida
    return fav.idDrink === idDrinkSelected;
  });
  const favoriteFoundIndex = favorites.findIndex((fav) => {
    // versi está en favs
    return fav.idDrink === idDrinkSelected;
  });
  if (favoriteFoundIndex === -1) {
    //no lo encontró
    favorites.push(drinkFound);
  } else {
    //eliminar de la list favoritos
    favorites.splice(favoriteFoundIndex, 1); //que me elimine 1
  }
  paintDrinks();
  console.log(favorites);
}
//----------funcion para la bebida

//-----------funciones manejadoras de los botones del formulario
function handleClickSearchButton(event) {
  event.preventDefault();
}
function handleClickResetButton(event) {
  event.preventDefault();
}
//---------fetch drinks from server
fetch(urlServer)
  .then((response) => response.json())
  .then((data) => {
    //console.log(data.drinks);
    drinks = data.drinks;
    paintDrinks();
  });
