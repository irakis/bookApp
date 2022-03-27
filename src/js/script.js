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

  const render = function () {

    for (const book of dataSource.books) {

      const generatedHTML = templates.bookCard(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      const listOfBooks = document.querySelector(select.books.bookList);
      listOfBooks.appendChild(element);
    }
  };
  render();

  const initAction = function () {
    const booksContainer = document.querySelector(select.books.booksPanel);
    const favoriteBooks = [];

    booksContainer.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const bookId = event.target.offsetParent.getAttribute('data-id');

      if (!favoriteBooks.includes(bookId) && event.target.offsetParent.classList.contains('book__image')) {
        event.target.offsetParent.classList.add('favorite');
        favoriteBooks.push(bookId);
      } else if (favoriteBooks.includes(bookId)) {
        event.target.offsetParent.classList.remove('favorite');
        const index = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(index, 1);
      }
      console.log(favoriteBooks);
    });
  };
  initAction();

  const filtering = function () {

    const filterForm = document.querySelector(select.form);
    console.log('filterForm', filterForm);

    const filters = [];

    filterForm.addEventListener('click', function (event) {

      if (event.target.type == 'checkbox') {

        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
          filters.push(value);
        } else {
          filters.splice(filters.indexOf(value), 1);
        }
      }
      filterBooks();
    });
    const filterBooks = function () {

      for (let book of dataSource.books) {

        const bookId = book.id;
        const selected = document.querySelector(select.books.bookImage + '[data-id = "' + bookId + '"]');
        let shouldBeHidden = false;

        for (let filter of filters) {
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
    };
  };
  filtering();


}