console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  const url = 'https://mutably.herokuapp.com/books';
  const createNode = element => document.createElement(element);
  const append = (parent, element) => parent.appendChild(element);
  const ul = document.querySelector('.list-group');
  const form = document.querySelector('form');

  const UI = {
    addBooksToPage: (books) => {
      console.log("books?", books);
      books.map(book => {
        let li = createNode('li'),
            img = createNode('img'),
            span = createNode('span');
        img.src = book.image;
        span.innerHTML = `${book.author} ${book.title} ${book.releaseDate}`
        append(li, img);
        append(li, span);
        append(ul, li);
      })
    },
    addNewBook: (books) => {
      console.log("BOOKS!!!!!",books);
      let newBook = books[books.length - 1]
      img.src = newBook.image;
      span.innerHTML = `${newBook.author} ${newBook.title} ${newBook.releaseDate}`
      append(li, img);
      append(li, span);
      append(ul, li);
    }
  }

  const DATA = {
    fetchAllBooks: () => {
      return fetch(url)
        .then(response => response.json())
        .then(data => data.books)
    },
    createBook: () => {
      return fetch(url, {
          method: 'POST',
          mode: 'cors',
        	headers: new Headers({
      		'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            title: form.elements.booktitle.value,
            author: form.elements.authorname.value,
            image: form.elements.imagelink.value,
            releaseDate: form.elements.releasedate.value
          })
        })
          .then(response => response.json())
          .then(data => {
            console.log("what is this", data.books);
          })
    }
  }

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
      .then(books => {
        UI.addNewBook(books)
      })
    }
  }

  CONTROLLER.fetchAllBooks()


  form.addEventListener("submit", CONTROLLER.createBook)

});
