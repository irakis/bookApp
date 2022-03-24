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
    templateOf: {
      bookTemplate: '#template-book',
    }
  };

  const templates = {
    bookCard: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),

  };

  const render = function() {

    for (const book of dataSource.books) {

      const generatedHTML = templates.bookCard(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      const listOfBooks = document.querySelector(select.books.bookList);
      listOfBooks.appendChild(element);
    }
  };
  render();

  const initAction = function() {
    const booksContainer = document.querySelector(select.books.booksPanel);
      
    const favoriteBooks = [];
    console.log(favoriteBooks);

    booksContainer.addEventListener('dblclick', function(event){
      event.preventDefault();

      const bookId = event.target.offsetParent.getAttribute('data-id');
      const index = favoriteBooks.indexOf(bookId);

      console.log('event:', event);
      console.log('bookId:', bookId, 'index:', index);


      if(!favoriteBooks.includes(index) && event.target.offsetParent.classList.contains('book__image')){

        event.target.offsetParent.classList.add('favorite');
        favoriteBooks.push(bookId);

      }else if(favoriteBooks.includes(index)){

        event.target.offsetParent.classList.remove('favorite');
        favoriteBooks.splice(index, 1);
      }
    });

    console.log(favoriteBooks);
  
  };
  initAction();
  
}