$(document).ready(function(){

createBookRow = (title, author, bookId) => {
  $('.list-group').append(
    `<li class="row" data-book-id="${bookId}">
      <button class="editButton col-md-2">Edit</button>
      <button class="saveButton col-md-2 invisible">Save</button>
      <p class="col-md-4">${title}</p>
      <input class="col-md-4 invisible"  value="${title}"/>
      <p class="col-md-4">${author}</p>
      <input class="col-md-4 invisible"  value="${author}"/>
      <button class="deleteButton col-md-2">Delete</button>
    </li>`)
}

displayAllBooks = (mutablyResponse) => {
  for (i=0; i<mutablyResponse.books.length; i++) {
    const book = mutablyResponse.books[i]
    createBookRow(book.title, book.author, book._id)
  }
}

const showAllBooks = () => {
  $.ajax({
    type: 'GET',
    url: 'https://mutably.herokuapp.com/books',
    success: (mutablyResponse) => {
      displayAllBooks(mutablyResponse)
      eventListeners()
    }
  })
}

showAllBooks()

const addBook = (title, author, bookId) => {
  event.preventDefault()
  $.ajax({
    type: 'POST',
    url: 'https://mutably.herokuapp.com/books',
    data: {title, author, bookId},
    success: createBookRow(title, author, bookId)
  })
}

const deleteBook = (bookId) => {
  $.ajax({
    type: 'DELETE',
    url: 'https://mutably.herokuapp.com/books/' + bookId,
    success: $('li[data-book-id="'+bookId+'"]').remove()
  })
}

$('button.addBook').on('click', () => {
  const newBookForm = $('.newBook').serializeArray()

  const newBookTitle = newBookForm[0].value
  const newBookAuthor = newBookForm[1].value

  addBook(newBookTitle, newBookAuthor)
})

const eventListeners = () => {
  $('.deleteButton').on('click', function () {
    const bookId = $(this).parent().attr('data-book-id')
    deleteBook(bookId)
  })

  $('button.editButton, button.saveButton').on('click', () => {
    $('button.editButton, button.saveButton').toggleClass('invisible')
    $('p, input').toggleClass('invisible')
  })

}






});
