console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  const DOMELEMENTS = {
    rootURL: () => 'https://mutably.herokuapp.com/books',
    createNode: element => document.createElement(element),
    append: (parent, element) => parent.appendChild(element),
    ul: () => document.querySelector('.list-group'),
    form: () => document.querySelector('form'),
    updateButton: () => document.querySelectorAll('button')
  };

  const UI = {
    appendBook: (book) => {
      let containerUL = DOMELEMENTS.createNode('ul'),
          authorLI = DOMELEMENTS.createNode('li'),
          bookTitleLI = DOMELEMENTS.createNode('li'),
          releaseDateLI = DOMELEMENTS.createNode('li'),
          img = DOMELEMENTS.createNode('img'),
          //span = DOMELEMENTS.createNode('span'),
          button = DOMELEMENTS.createNode('button');
      img.src = book.image;
      authorLI.innerHTML = `${book.author}`;
      bookTitleLI.innerHTML = `${book.title}`;
      releaseDateLI.innerHTML = `${book.releaseDate}`;
      button.innerHTML = `Edit`
      DOMELEMENTS.append(containerUL, img);
      DOMELEMENTS.append(containerUL, authorLI);
      DOMELEMENTS.append(containerUL, bookTitleLI)
      DOMELEMENTS.append(containerUL, releaseDateLI);
      DOMELEMENTS.append(containerUL, button);
      DOMELEMENTS.append(DOMELEMENTS.ul(), containerUL);
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
    },
    updateBook: function () {
      $(this).siblings().each(
       function(){
           if ($(this).find('input').length) {
               $(this).text($(this).find('input').val());
           } else {
               var inputTextValue = $(this).text();
               $(this).text('').append($('<input />',{'value' : inputTextValue}).val(inputTextValue));
           }
       });
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
    },
    // updateBook: () => {
    //   //event.preventDefault();
    //   UI.updateBook();
    // }
  };

  CONTROLLER.fetchAllBooks();
  DOMELEMENTS.form().addEventListener("submit", CONTROLLER.createBook);
  $(DOMELEMENTS.ul()).on('click', 'button', UI.updateBook);
});
