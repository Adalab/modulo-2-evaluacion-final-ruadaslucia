"use strict";let favorites=localStorage.getItem("favorites");const favoriteList=document.querySelector(".js-favorites"),inputSearch=document.querySelector(".js-input"),buttonSearch=document.querySelector(".js-button-search"),drinkList=document.querySelector(".js-drinkList");if(null===favorites)favorites=[];else{favorites=JSON.parse(favorites);for(const e of favorites){let t=createLiFavoriteElement(e);favoriteList.appendChild(t)}}function handleClickBtnSearch(e){drinkList.innerHTML="",e.preventDefault();let t=inputSearch.value;fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+t).then(e=>e.json()).then(e=>{for(const t of e.drinks){let e=createBaseLiDrink(t),r=document.createElement("button");r.innerText="fav",e.appendChild(r),r.addEventListener("click",()=>{addDrinkToFavorites(t,e)}),existsInFavorites(t)?removeFavButttonAndChangeColors(e):e.classList.add("regularItem"),drinkList.appendChild(e)}})}function existsInFavorites(e){for(const t of favorites)if(e.idDrink===t.idDrink)return!0;return!1}function createBaseLiDrink(e){let t=document.createElement("li"),r=document.createElement("img");r.setAttribute("src",e.strDrinkThumb),t.appendChild(r);let i=document.createElement("p");return i.innerText=e.strDrink,t.appendChild(i),t}function addDrinkToFavorites(e,t){removeFavButttonAndChangeColors(t);let r=createLiFavoriteElement(e,t);t.classList.add("clickedFavorites"),t.classList.remove("regularItem"),favoriteList.appendChild(r),favorites.push(e),addToLocalStorage(favorites)}function createLiFavoriteElement(e,t){let r=createBaseLiDrink(e),i=document.createElement("button");return i.innerText="-",i.addEventListener("click",()=>{removeDrinkFromFavorites(e,r,t)}),r.appendChild(i),r}function removeDrinkFromFavorites(e,t,r){favorites.splice(e,1),favoriteList.removeChild(t),addToLocalStorage(favorites),r.classList.remove("clickedFavorites"),r.classList.add("regularItem")}function addToLocalStorage(e){localStorage.setItem("favorites",JSON.stringify(e))}function removeFavButttonAndChangeColors(e){e.querySelector("button").classList.add("notDisplay"),e.classList.add("clickedFavorites")}buttonSearch.addEventListener("click",handleClickBtnSearch);