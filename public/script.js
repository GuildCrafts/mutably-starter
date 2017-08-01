console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  const baseURL = 'http://mutably.herokuapp.com'

  getAllBooks(baseURL)

  $(document).on('click', '.view-btn', function() {
    const bookId = $(this).closest('li').attr('id')
    const selectedListItem = $(this).closest('li')

    getOneBook(baseURL, bookId, selectedListItem)
  })

  $(document).on('click', '.close-btn', function() {
    $(this).closest('div.card').remove()
  })
});




const getAllBooks = (baseURL) => {
  $.ajax({
    url: `${baseURL}/books`,
    contentType: 'application/json',
    success: function(response) {
      createListElement(response.books)
    },
    error: (error) => {
      console.error(error.message)
    }
  })
}

const createListElement = (books) => {
  books.forEach(function(book) {
    $('.list-group').append(`
      <li class='list-group-item' id=${book._id}>${book.title}
        <div class='list-btns'>
          <button type='button' class='btn btn-default view-btn'>View</button>
          <button type='button' class='btn btn-default edit-btn'>Edit</button>
          <button type='button' class='btn btn-default delete-btn'>Delete</button>
        </div>
      </li>
    `)
  })
}

const getOneBook = (baseURL, bookId, selectedListItem) => {
  $.ajax({
    url: `${baseURL}/books/${bookId}`,
    contentType: 'application/json',
    success: function(book) {
      viewBookDetails(book, selectedListItem)
    },
    error: function(error) {
      console.error(error.message)
    }
  })
}

const viewBookDetails = (book, selectedListItem) => {
  if (!selectedListItem.next().hasClass('card')) {
    selectedListItem.after(`
      <div class="card">
      <img class="thumbnail" src=${book.image} alt="Card image cap" height='100%' width='120px'>
      <div class="card-block">
        <h2 class="card-title">${book.title}</h2>
        <p class="card-text">Author: ${book.author}</p>
        <p class="card-text">Release Date: ${book.releaseDate}</p>
        <button class="btn btn-primary close-btn">Close</button>
      </div>
    `)
  }
}
