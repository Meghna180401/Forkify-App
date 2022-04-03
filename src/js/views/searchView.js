import View from './view.js';

class SearchView {
  _parentEl = document.querySelector('.search');

  //Get the input value entered
  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clear();
    return query;
  }

  //Clear input field after search submission
  _clear() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  //Handle click on button or submission of search query
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
