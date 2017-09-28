console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  const DOMELEMENTS = {
    rootURL: () => 'https://mutably.herokuapp.com/books',
    createNode: element => document.createElement(element),
    append: (parent, element) => parent.appendChild(element),
    ul: () => document.querySelector('.list-group'),
    form: () => document.querySelector('form')
  };

  const UI = {
    appendBook: (book) => {
      let li = DOMELEMENTS.createNode('li'),
          img = DOMELEMENTS.createNode('img'),
          span = DOMELEMENTS.createNode('span'),
          button = DOMELEMENTS.createNode('button');
      img.src = book.image;
      span.innerHTML = `<br>${book.author}<br>${book.title}<br>${book.releaseDate}`;
      button.innerHTML = `Edit`
      DOMELEMENTS.append(li, img);
      DOMELEMENTS.append(li, span);
      DOMELEMENTS.append(li, button);
      DOMELEMENTS.append(DOMELEMENTS.ul(), li);
    },
    addBooksToPage: (books) => {
      books.map(book => {
        UI.appendBook(book)
      })
    },
    addNewBook: (book) => {
      let newBook = book
      UI.appendBook(book)
    },
    extractBookFromForm: () => {
      return {
        title: DOMELEMENTS.form().elements.booktitle.value,
        author: DOMELEMENTS.form().elements.authorname.value,
        image: DOMELEMENTS.form().elements.imagelink.value,
        releaseDate: DOMELEMENTS.form().elements.releasedate.value
      }
    }
  };

  const DATA = {
    fetchAllBooks: () => {
      return fetch(DOMELEMENTS.rootURL(), {
          method: 'GET',
          mode: 'cors',
        	headers: new Headers({
      		'Content-Type': 'application/json'
          })
      })
        .then(response => response.json())
        .then(data => data.books)
    },
    createBook: () => {
      let book = UI.extractBookFromForm()
      return fetch(DOMELEMENTS.rootURL(), {
          method: 'POST',
          mode: 'cors',
        	headers: new Headers({
      		'Content-Type': 'application/json'
          }),
          body: JSON.stringify(book)
        })
          .then(response => response.json())
    }
  };

  const CONTROLLER = {
    fetchAllBooks: () => {
      DATA.fetchAllBooks()
      .then( books => {
        UI.addBooksToPage(books)
      })
    },
    createBook: (event) => {
      event.preventDefault();
      DATA.createBook()
      .then(book => {
        UI.addNewBook(book)
      })
    }
  };

  CONTROLLER.fetchAllBooks()
  DOMELEMENTS.form().addEventListener("submit", CONTROLLER.createBook)
});
