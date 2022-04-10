'use strict';
//--recupero los favoritos del local storage
let favorites = localStorage.getItem('favorites');
//constantes
const favoriteList = document.querySelector('.js-favorites');
const inputSearch = document.querySelector('.js-input');
const buttonSearch = document.querySelector('.js-button-search');
const drinkList = document.querySelector('.js-drinkList');
//if para
if (favorites === null) {
  favorites = [];
} else {
  favorites = JSON.parse(favorites);
  for (const favorite of favorites) {
    let favLiElement = createLiFavoriteElement(favorite);
    favoriteList.appendChild(favLiElement);
  }
}
//evento escucha click
buttonSearch.addEventListener('click', handleClickBtnSearch);
//funcion manejadora del boton buscar
function handleClickBtnSearch(event) {
  drinkList.innerHTML = '';
  event.preventDefault();
  //variable con el valor del input
  let searchTerm = inputSearch.value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;
  console.log(searchTerm);
  //fetch para traer la info de la api
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      for (const drink of data.drinks) {
        let liDrink = createBaseLiDrink(drink); //crea una lista en drink
        let buttonFav = document.createElement('button'); //crea boton fav
        buttonFav.innerText = 'fav';
        liDrink.appendChild(buttonFav); //metemos el boton fav en lista
        buttonFav.addEventListener('click', () => {
          //evento escucha boton fav
          addDrinkToFavorites(drink, liDrink); //funcion que añade drink a favoritos
        });
        if (existsInFavorites(drink)) {
          //si existe esta funcion
          removeFavButttonAndChangeColors(liDrink); //se aplica esta otra funcion
        } else {
          //si no
          liDrink.classList.add('regularItem'); //se agrega esta clase
        }

        drinkList.appendChild(liDrink); //adjunta la bebida a drinkList
      }
    });
}
//funcion para ver si un favorito existe en la lista de favoritos por medio del id de la bebida
function existsInFavorites(drink) {
  for (const favorite of favorites) {
    if (drink.idDrink === favorite.idDrink) {
      return true;
    }
  }
  return false;
}

//funcion que contiene la creacion de una estructura de bebida
function createBaseLiDrink(drink) {
  let liDrink = document.createElement('li'); //se crea el li

  let liImageDrink = document.createElement('img'); //se crea la imagen
  liImageDrink.setAttribute('src', drink.strDrinkThumb); //se le crea un src asociado a la imagen
  liDrink.appendChild(liImageDrink); // se adjunta la imagen a la lista

  let liNameDrink = document.createElement('p'); //se crea un elemento parrafo
  liNameDrink.innerText = drink.strDrink; //se le crea el texto del parrafo
  liDrink.appendChild(liNameDrink); //se adjunta el parrafo a la lista

  return liDrink;
}

function addDrinkToFavorites(drink, liDrinkResult) {
  removeFavButttonAndChangeColors(liDrinkResult);

  //crear el fav y añadirlo a la lista de favs
  let liDrink = createLiFavoriteElement(drink);
  favoriteList.appendChild(liDrink);
  favorites.push(drink);
  addToLocalStorage(favorites);
}

function createLiFavoriteElement(drink) {
  let liDrink = createBaseLiDrink(drink);
  return liDrink;
}

//funcion para llenar el local storage
function addToLocalStorage(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

//funcion para cambiar colores y remover botón fav de la lista general
function removeFavButttonAndChangeColors(liDrink) {
  //ocultar boton favorito
  let liFavbutton = liDrink.querySelector('button');
  liFavbutton.classList.add('notDisplay');
  //poner estilos al fav en el list de resultados
  liDrink.classList.add('clickedFavorites');
  liDrink.classList.remove('regularItem');
}
