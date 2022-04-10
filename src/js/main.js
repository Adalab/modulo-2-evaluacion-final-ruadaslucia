'use strict';
//--recupero los favoritos del ls
let favorites = localStorage.getItem('favorites');

const favoriteList = document.querySelector('.js-favorites');
const inputSearch = document.querySelector('.js-input');
const buttonSearch = document.querySelector('.js-button-search');

const drinkList = document.querySelector('.js-drinkList');

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

  //crear el fav y añadirlo a la lista de favs
  let liDrink = createLiFavoriteElement(drink, liDrinkResult);
  liDrinkResult.classList.add('clickedFavorites');
  liDrinkResult.classList.remove('regularItem');
  favoriteList.appendChild(liDrink);
  favorites.push(drink);
  addToLocalStorage(favorites);
}

function createLiFavoriteElement(drink, liDrinkResult) {
  let liDrink = createBaseLiDrink(drink);
  let removeButton = document.createElement('button');
  removeButton.innerText = '-';
  removeButton.addEventListener('click', () => {
    removeDrinkFromFavorites(drink, liDrink, liDrinkResult);
  });
  liDrink.appendChild(removeButton);
  return liDrink;
}

function removeDrinkFromFavorites(drink, liDrink, liDrinkResult) {
  favorites.splice(drink, 1);
  favoriteList.removeChild(liDrink);
  addToLocalStorage(favorites);
  liDrinkResult.classList.remove('clickedFavorites');
  liDrinkResult.classList.add('regularItem');
}

function addToLocalStorage(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function removeFavButttonAndChangeColors(liDrink) {
  //ocultar boton favorito
  let liFavbutton = liDrink.querySelector('button');
  liFavbutton.classList.add('notDisplay');
  //poner estilos al fav en el list de resultados
  liDrink.classList.add('clickedFavorites');
}
