console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  const baseURL = 'http://mutably.herokuapp.com'

  getAllBooks(baseURL)

  $(document).on('click', '.view-btn', function() {
    $(this).closest('li').next().toggleClass('hide-card')
  })

  $(document).on('click', '.close-btn', function() {
    $(this).closest('div.card').toggleClass('hide-card')
  })

  $(document).on('click', '.delete-btn', function() {
    const bookId = $(this).closest('li').attr('id')
    deleteOneBook(baseURL, bookId)
  })

  $(document).on('click', '.edit-btn', function() {
    $(this).closest('li').next().next().toggleClass('hide-card')
  })
});

// Get data for all books
const getAllBooks = (url) => {
  $.ajax({
    url: `${url}/books`,
    contentType: 'application/json',
    method: 'get'
  })
  .done(function(response) {
    createListElement(response.books)
  })
  .catch(error => {
    alert('Oh no! Something went wrong. Please try again.')
  })
}

// Create a new list element for each book
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
      <div class="card hide-card">
        <div class='col-sm-4 image-holder'>
          <img class="thumbnail" src=${book.image} alt="Card image cap" height='230px' width='160px'>
        </div>
        <div class="card-block">
          <h2 class="card-title">${book.title}</h2>
          <p class="card-text">Author: ${book.author}</p>
          <p class="card-text">Release Date: ${book.releaseDate}</p>
          <button class="btn btn-primary close-btn">Close</button>
        </div>
      </div>
      <div class='edit-card hide-card'>
        <div class='row'>
          <div class='col-sm-4 image-holder'>
            <img class="thumbnail" src=${book.image} alt="Card image cap" height='230px' width='160px'>
          </div>
          <div class='col-sm-8'>
            <h2>Edit book details</h2>
            <form>
              <div class='input-section'>
                <label for="title" class="col-sm-4 col-form-label">Title</label>
                <div class="form-input col-sm-8">
                  <input type="text" class="form-control" id="title" value=${book.title}">
                </div>
               </div>
              <div class='input-section'>
                <label for="author" class="col-sm-4 col-form-label">Author</label>
                <div class="form-input col-sm-8">
                  <input type="text" class="form-control" id="author" value=${book.author}">
                </div>
               </div>
              <div class='input-section'>
                <label for="edit-date" class="col-sm-4 col-form-label">Release Date</label>
                <div class="form-input col-sm-8">
                  <input type="text" class="form-control" id="edit-date" value=${book.releaseDate}">
                </div>
              </div>
              <div class='list-btns'>
                <button type='submit' class='btn btn-primary form-btn'>Upload Image</button>
                <button type='submit' class='btn btn-primary form-btn'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `)
  })
}

// Delete book entry from the page

const deleteOneBook = (url, bookId) => {
  $.ajax({
    url: `${url}/books/${bookId}`,
    contentType: 'application/json',
    method: 'delete'
  })
  .done(function(response) {
    removeBookElement(bookId)
  })
  .catch(error => {
    console.error('Error: ', error)
    alert('Oh no! Something when wrong. Please try again.')
  })
}

const removeBookElement = (bookId) => {
  $(`#${bookId}`).hide('slow', function() {
    $(this).remove()
  })
}
