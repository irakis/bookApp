/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    books: {
      booksPanel: '.books-panel',
      bookList: '.books-list',
      bookImageLink: 'data-id',
      cardOfBook: '.book',
      bookImage: '.book__image',
    },
    form: '.filters',
    InputCheckbox: 'input[type="checkbox"]',
    InputName: 'input[name="filter"]',
    templateOf: {
      bookTemplate: '#template-book',
    }
  };

  const templates = {
    bookCard: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  class BookList {
    constructor() {
      //const thisBookList = this;
      this.initData();
      this.getElements();
      this.render();
      this.initAction();
      this.initFilterAction();
      this.favoriteBooks = [];
      this.filters = [];
    }

    initData() {
      this.data = dataSource.books;
    }

    getElements() {
      this.listOfBooks = document.querySelector(select.books.bookList);
      this.booksContainer = document.querySelector(select.books.booksPanel);
      this.filterForm = document.querySelector(select.form);
    }

    render() {
      for (const book of dataSource.books) {
        const bookData = {
          id: book.id,
          name: book.name,
          price: book.price,
          rating: book.rating,
          image: book.image,
          details: book.details,
        };
        const ratingBgc = this.determineRatingBgc(book.rating);
        bookData.ratingBgc = ratingBgc;
        const ratingWidth = book.rating * 10;
        bookData.ratingWidth = ratingWidth;
        const generatedHTML = templates.bookCard(bookData);
        const element = utils.createDOMFromHTML(generatedHTML);
        this.listOfBooks.appendChild(element);
      }
    }

    initAction() {
      const _self = this;
      this.booksContainer.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const bookId = event.target.offsetParent.getAttribute('data-id');
        if (!_self.favoriteBooks.includes(bookId) && event.target.offsetParent.classList.contains('book__image')) {
          event.preventDefault();
          event.target.offsetParent.classList.add('favorite');
          _self.favoriteBooks.push(bookId);
        } else if (_self.favoriteBooks.includes(bookId)) {
          event.target.offsetParent.classList.remove('favorite');
          const index = _self.favoriteBooks.indexOf(bookId);
          _self.favoriteBooks.splice(index, 1);
        }
      });
      this.booksContainer.addEventListener('click', function(event) {
        event.preventDefault();
      });
    }

    initFilterAction() {
      const _self = this;
      this.filterForm.addEventListener('click', function (event) {
        if (event.target.type == 'checkbox') {
          const value = event.target.value;
          const isChecked = event.target.checked;
          if (isChecked) {
            _self.filters.push(value);
          } else {
            _self.filters.splice(_self.filters.indexOf(value), 1);
          }
        }
        _self.filterBooks();
      });
    }

    filterBooks() {
      for (let book of dataSource.books) {
        const bookId = book.id;
        const selected = document.querySelector(select.books.bookImage + '[data-id = "' + bookId + '"]');
        let shouldBeHidden = false;
        for (let filter of this.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden) {
          selected.classList.add('hidden');
        } else {
          selected.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
      let background = '';
      if (rating < 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }
  }
  new BookList();
}