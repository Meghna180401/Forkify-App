import View from "./view.js";
//import icons from "../../img/icons.svg";
//import icons from 'url:../../img/icons.svg'; //Parcel 2

//render(),renderError(),renderMsg(),renderSpinner(),clear() in View

class BookmarksView extends View {
  _parentEl = document.querySelector(".bookmarks__list");
  _message = "";
  _errorMsg = "No bookmarks yet. Find a nice recipe and bookmark it :)";

  //Function to render bookmark on load
  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  //Function to generate markup of the search results
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }
  //Markup of a particular recipe in the array of existing recipes
  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
      <a class="preview__link ${
        result.id === id ? "preview__link--active" : ""
      }" href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.image}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
          <div class="preview__user-generated ${result.key ? "" : "hidden"}">
              <svg>
                <use href="/img/icons.svg#icon-user"></use>
              </svg>
          </div>
        </div>
      </a>
    </li>
    `;
  }
}
export default new BookmarksView();
