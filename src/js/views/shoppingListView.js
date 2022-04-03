import View from "./view.js";
//import icons from "../../img/icons.svg";
//import icons from 'url:../../img/icons.svg'; //Parcel2

//render(),renderError(),renderMsg(),renderSpinner(),clear() in View

class ShoppingListView extends View {
  _parentEl = document.querySelector(".shopping__list");
  _message = "";
  _errorMsg = "No items yet";

  //Function to render shopping list on load
  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  //Function to listen to clicks on delete item in shopping list
  addHandlerUpdateItem(handler) {
    this._parentEl.addEventListener("click", function (e) {
      e.preventDefault();
      const id = e.target.closest(".shopping__item").dataset.itemid;

      // Handle the delete button
      if (e.target.matches(".shopping__delete, .shopping__delete *")) {
        handler(id);
      }

      // Handle the count update
      else if (e.target.matches(".shopping__count-value")) {
        const val = parseFloat(e.target.value, 10);
        handler(id, val);
      }
    });
  }

  deleteItem(id) {
    const item = document.querySelector(`[data-itemid="${id}"`);
    if (item) item.parentElement.removeChild(item);
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupIngredient).join("");
  }
  _generateMarkupIngredient(item) {
    if (item.qty === null || item.qty === 0) {
      return `
      <li class="shopping__item" data-itemid=${item.id}>
        <p class="shopping__description">${item.desc}</p>
          <button class="shopping__delete btn--tiny">
          <svg>
            <use href="/img/icons.svg#icon-circle-with-cross"></use>
          </svg>
        </button>
      </li>`;
    } else {
      return `
      <li class="shopping__item" data-itemid=${item.id}>
        <div class="shopping__count">
          <input type="number" value="${item.qty}" step=1 class="shopping__count-value" min=1>
          <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.desc}</p>
          <button class="shopping__delete btn--tiny">
          <svg>
            <use href="/img/icons.svg#icon-circle-with-cross"></use>
          </svg>
        </button>
      </li>`;
    }
  }
}

export default new ShoppingListView();
