/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    books: {
      booksPanel: '.books-panel',
      bookList: '.books-list',
    },
    templateOf: {
      bookTemplate: '#template-book',
    }
  };

  const templates = {
    bookCard: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),

  };

  const renderBookList = function() {

    for (const book of dataSource.books) {

      const generatedHTML = templates.bookCard(book);
      console.log(generatedHTML);
      //generate HTML based on template

      const element = utils.createDOMFromHTML(generatedHTML);
      console.log(element);
      //create element using utils

      const listOfBooks = document.querySelector(select.books.bookList);
      //find list DOM

      listOfBooks.appendChild(element);
      //prepare book cart, inmages //add element
    }

  };
  renderBookList();
  console.log('renderBookList runs!')

}