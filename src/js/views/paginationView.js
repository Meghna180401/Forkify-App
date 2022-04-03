import View from "./view.js";
//import icons from "../../img/icons.svg";
//import icons from 'url:../../img/icons.svg'; //Parcel2

//render(),renderError(),renderMsg(),renderSpinner(),clear() in View

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  _addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //At page 1 and there are other pages
    if (currPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          currPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currPage + 1}/${numPages} </span>
          <svg class="search__icon">
            <use href="/img/icons.svg#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    //At last page
    if (currPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="/img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}/${numPages}</span>
      </button>`;
    }

    //At any middle page
    if (currPage > 1 && currPage < numPages) {
      return `
      <button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="/img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}/${numPages}</span>
      </button>
      <button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}/${numPages}</span>
        <svg class="search__icon">
          <use href="/img/icons.svg#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }

    //At page 1 and NO other pages
    return "";
  }
}
export default new PaginationView();
