'use strict';
//--recupero los favoritos del ls
let favorites = localStorage.getItem('favorites');
const favoriteList = document.querySelector('.js-favorites');
const inputSearch = document.querySelector('.js-input');
const buttonSearch = document.querySelector('.js-button-search');

const drinkList = document.querySelector('.js-drinkList');

buttonSearch.addEventListener('click', handleClickBtnSearch);

function handleClickBtnSearch(event) {
  event.preventDefault();
  let searchTerm = inputSearch.value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;
  console.log(searchTerm);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      for (const drink of data.drinks) {
        let liDrink = createBaseLiDrink(drink);
        let buttonFav = document.createElement('button');
        buttonFav.innerText = 'fav';
        liDrink.appendChild(buttonFav);
        buttonFav.addEventListener('click', () => {
          addDrinkToFavorites(drink, liDrink);
        });
        drinkList.appendChild(liDrink);
      }
    });
}

function createBaseLiDrink(drink) {
  let liDrink = document.createElement('li');

  let liImageDrink = document.createElement('img');
  liImageDrink.setAttribute('src', drink.strDrinkThumb);
  liDrink.appendChild(liImageDrink);

  let liNameDrink = document.createElement('p');
  liNameDrink.innerText = drink.strDrink;
  liDrink.appendChild(liNameDrink);

  return liDrink;
}

function addDrinkToFavorites(drink, liDrinkResult) {
  //meter la bebida en el [] favorites lin.3 (local Storage)
  //cambiar el color
  //lo va a pintar en la lista de favoritos
  let liDrink = createBaseLiDrink(drink);
  favoriteList.appendChild(liDrink);
  liDrinkResult.classList.add('clickedFavorites');
}

//boton reset
