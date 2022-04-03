import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import searchResultsView from "./views/searchResultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import shoppingListView from "./views/shoppingListView.js";
import addRecipeView from "./views/addRecipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

require("/src/sass/main.scss");

// if (module.hot) {
//   module.hot.accept();
// }

//Function to load and render a particular recipe
const showRecipe = async function () {
  //Loading recipe
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    //Update search results and bookmarks to show selected recipe
    searchResultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    //Loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    //Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    //alert(err);
    recipeView.renderError();
  }
};

//Function to load and render all search results
const showSearchResults = async function () {
  try {
    //Get the search query
    const query = searchView.getQuery();
    if (!query) return;

    searchResultsView.renderSpinner();
    //Load search results
    await model.loadSearchResults(query);

    //Render search results
    searchResultsView.render(model.getSearchResultsPage());

    //Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

//Function to sync pagination clicks with rendered results
const controlPagination = function (goToPage) {
  //Render search results
  searchResultsView.render(model.getSearchResultsPage(goToPage));

  //Render initial pagination buttons
  paginationView.render(model.state.search);
};

//Function to update the ingredients as per number of servings
const controlServings = function (newServings) {
  //Update the recipe servings(in state)
  model.updateServings(newServings);

  //Update the recipe view
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

//Function to bookmark a recipe
const controlBookmark = function () {
  //Add or remove a bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  //Update the recipe view
  recipeView.update(model.state.recipe);

  //Update the bookmarks view
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarksLoad = function () {
  bookmarksView.render(model.state.bookmarks);
};

//Function to add items to shopping list
const controlAddShoppingList = function () {
  //Add the ingredients to shopping list
  model.addToShoppingList();

  //Update shopping list view
  shoppingListView.render(model.state.shoppingList);
};

const controlUpdateItemShoppingList = function (id, newVal = 0) {
  //Handle delete operation
  if (newVal === 0) {
    //Remove the ingredients from the shopping list
    model.removeItem(id);
    //Remove the ingredients from the shopping list view
    shoppingListView.deleteItem(id);
  }

  //Handle update quantity operation
  else {
    const item = model.getItem(id);
    if (item.qty >= 0) {
      model.updateQty(id, newVal);
    }
  }
};

const controlShoppingListLoad = function () {
  shoppingListView.render(model.state.shoppingList);
};

//Function to add recipe
const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarksLoad);
  shoppingListView.addHandlerRender(controlShoppingListLoad);
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmark);
  recipeView.addHandlerShoppingList(controlAddShoppingList);
  searchView.addHandlerSearch(showSearchResults);
  paginationView._addHandlerClick(controlPagination);
  shoppingListView.addHandlerUpdateItem(controlUpdateItemShoppingList);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
