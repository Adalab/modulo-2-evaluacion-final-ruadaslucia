'use strict';
//----------------------declaro constantes

const inputSearchUser = document.querySelector('.js-inputSearchUser');
const searchButton = document.querySelector('.js-searchButton');
const resetButton = document.querySelector('.js-resetButton');

//----imagen por defecto
const defaultImage =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=COCKTAIL';

//----url del pdf
const urlServer = 'https://www.thecocktaildb.com/';

let results = [];

//----valor que escribe el usuario
function getTheInputValue() {
  return inputSearchUser.value;
}
//--peticion con el valor al servidor
function fetchdata() {
  const inputValue = getTheInputValue();
  fetch(`https://www.thecocktaildb.com/browse.php?s=${inputValue}`);
  getTheInputValue((response) => response.json()).then((cocktailsData) => {
    results = [];
    for (const result of cocktailsData.results) {
      results.push(result);
    }
  });
}

// aqui dejo los listeners y los handleClick, me viene mejor.
function handleClickSearch(event) {
  event.preventDefault();
}
function handleClickReset(event) {
  event.preventDefault();
}

searchButton.addEventListener('click', handleClickSearch);
resetButton.addEventListener('click', handleClickReset);
