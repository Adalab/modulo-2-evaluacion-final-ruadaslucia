"use strict";let favorites=localStorage.getItem("favorites");const favoriteList=document.querySelector(".js-favorites"),inputSearch=document.querySelector(".js-input"),buttonSearch=document.querySelector(".js-button-search"),drinkList=document.querySelector(".js-drinkList");function handleClickBtnSearch(e){e.preventDefault();let t=inputSearch.value;const n="https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+t;console.log(t),fetch(n).then(e=>e.json()).then(e=>{for(const t of e.drinks){let e=createBaseLiDrink(t),n=document.createElement("button");n.innerText="fav",e.appendChild(n),n.addEventListener("click",()=>{addDrinkToFavorites(t,e)}),drinkList.appendChild(e)}})}function createBaseLiDrink(e){let t=document.createElement("li"),n=document.createElement("img");n.setAttribute("src",e.strDrinkThumb),t.appendChild(n);let r=document.createElement("p");return r.innerText=e.strDrink,t.appendChild(r),t}function addDrinkToFavorites(e,t){let n=createBaseLiDrink(e);favoriteList.appendChild(n),t.classList.add("clickedFavorites")}buttonSearch.addEventListener("click",handleClickBtnSearch);