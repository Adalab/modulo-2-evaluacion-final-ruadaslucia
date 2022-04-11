'use strict';
let favorites = localStorage.getItem('favorites');

const favoriteList = document.querySelector('.js-favorites');
const inputSearch = document.querySelector('.js-input');
const buttonSearch = document.querySelector('.js-button-search');
const drinkList = document.querySelector('.js-drinkList');
const buttonReset = document.querySelector('.js-button-reset');

if (favorites === null) {
  favorites = [];
} else {
  favorites = JSON.parse(favorites);
  for (const favorite of favorites) {
    let favLiElement = createLiFavoriteElement(favorite);
    favoriteList.appendChild(favLiElement);
  }
}
buttonSearch.addEventListener('click', handleClickBtnSearch);
function handleClickBtnSearch(event) {
  drinkList.innerHTML = '';
  event.preventDefault();
  let searchTerm = inputSearch.value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;
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
        if (existsInFavorites(drink)) {
          removeFavButttonAndChangeColors(liDrink);
        } else {
          liDrink.classList.add('regularItem');
        }

        drinkList.appendChild(liDrink);
      }
    });
}
function existsInFavorites(drink) {
  for (const favorite of favorites) {
    if (drink.idDrink === favorite.idDrink) {
      return true;
    }
  }
  return false;
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
  removeFavButttonAndChangeColors(liDrinkResult);

  let liDrink = createLiFavoriteElement(drink);
  favoriteList.appendChild(liDrink);
  favorites.push(drink);
  addToLocalStorage(favorites);
}

function createLiFavoriteElement(drink) {
  let liDrink = createBaseLiDrink(drink);
  return liDrink;
}

function addToLocalStorage(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function removeFavButttonAndChangeColors(liDrink) {
  let liFavbutton = liDrink.querySelector('button');
  liFavbutton.classList.add('notDisplay');
  liDrink.classList.add('clickedFavorites');
  liDrink.classList.remove('regularItem');
}
buttonReset.addEventListener('click', handleClickButtonReset);

function handleClickButtonReset() {
  favorites = [];
  favoriteList.innerHTML = '';
  localStorage.removeItem('favorites');
  inputSearch.value = '';
}
