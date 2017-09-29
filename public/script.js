console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  const createNode = element => document.createElement(element);

  const append = (parent, element) => parent.appendChild(element);

  const ul = document.querySelector('.list-group');

  fetch('https://mutably.herokuapp.com/books')
    .then(response => response.json())
    .then(data => {
      let books = data.books;
      return books.map(book => {
        let li = createNode('li'),
            img = createNode('img'),
            span = createNode('span');
        img.src = book.image;
        span.innerHTML = `${book.author} ${book.title} ${book.releaseDate}`
        append(li, img);
        append(li, span);
        append(ul, li);
      })
    })
});
