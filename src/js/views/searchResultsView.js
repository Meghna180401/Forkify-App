import View from "./view.js";
//import icons from "../../img/icons.svg";
//import icons from 'url:../../img/icons.svg'; //Parcel 2

//render(),renderError(),renderMsg(),renderSpinner(),clear() in View

class SearchResultsView extends View {
  _parentEl = document.querySelector(".results");
  _message = "";
  _errorMsg = "No recipes found for that query ☹";

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
export default new SearchResultsView();
