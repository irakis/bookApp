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
      //jak zrobić referencję do a i clasy book_image
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
    const books = document.querySelectorAll(select.books.bookImage);
      
    const favoriteBooks = [];
    console.log(favoriteBooks);

    for(const book of books) {
      book.addEventListener('dblclick', function(event){
        event.preventDefault();
        const bookId = book.getAttribute('data-id');
        let index = favoriteBooks.indexOf(bookId);

        if(index == -1){
          book.classList.add('favorite');
        
          favoriteBooks.push(bookId);
          console.log('czyta id po if?:',bookId);

        }else {
          book.classList.remove('favorite');
          favoriteBooks.splice(index, 1);
        }
        console.log('tablica po if: ',favoriteBooks);

      });
    }

    console.log(favoriteBooks);
  
  };
  initAction();
  
}