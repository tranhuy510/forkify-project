import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numberPages = Math.ceil(
      this._data.results.length / this._data.perPage
    );
    const curPage = this._data.page;
    // Page 1, and there are other page
    if (curPage === 1 && numberPages > 1)
      return this._generateMarkupNext(curPage);

    // Last page
    if (curPage === numberPages) return this._generateMarkupPrev(curPage);

    // Other page
    if (curPage < numberPages && numberPages > 1)
      return this._generateMarkupPrev(curPage).concat(
        this._generateMarkupNext(curPage)
      );

    // Page 1, and there are NO other page
    return '';
  }

  _generateMarkupPrev(curPage) {
    return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
    `;
  }

  _generateMarkupNext(curPage) {
    return `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
    `;
  }
}

export default new PaginationView();
