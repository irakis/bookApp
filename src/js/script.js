/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    books: {
      booksPanel: '.books-panel',
      bookList: '.books-list',
      bookImageLink: '#data-id',
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
    console.log(filters);

    filterForm.addEventListener('click', function (event) {
      console.log(event);

      

      const checkbox = document.querySelectorAll(select.InputCheckbox, select.InputName);
      console.log('checkbox', checkbox);
      const checkboxValue = checkbox.getAttribute('value');
      console.log(checkboxValue);


      if (event.target == checkbox) {
        console.log('warunek działa');
        //const value = event.target.getAttribute('value');
        console.log(value);
      }
    });
  };
  filtering();

}