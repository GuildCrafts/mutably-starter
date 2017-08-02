const baseURL = 'http://mutably.herokuapp.com'

$(document).ready(function(){

  getAllBooks(baseURL)

  $(document).on('click', '.view-btn', function() {
    $(this).closest('li').next().toggleClass('hide-card')
  })

  $(document).on('click', '.close-btn', function() {
    $(this).closest('div.edit-card').toggleClass('hide-card')
  })

  $(document).on('click', '.delete-btn', function() {
    const bookId = $(this).closest('li').attr('id')
    deleteOneBook(baseURL, bookId)
  })

  $(document).on('click', '.edit-btn', function() {
    $(this).closest('li').next().next().toggleClass('hide-card')
  })

  $(document).on('click', '.submit-btn', function(event) {
    event.preventDefault()
    const bookId = $(this).closest('div.edit-card').prev().prev().attr('id')
    const image = $(this).closest('div.edit-card').children().children('.image-holder').children().attr('src')
    const title = $(this).parent().parent().find('input#title').val()
    const author = $(this).parent().parent().find('input#author').val()
    const releaseDate = $(this).parent().parent().find('input#date').val()
    const details = {
      title,
      author,
      releaseDate,
      image
    }
    $(this).closest('div.edit-card').toggleClass('hide-card')
    editBookDetails(bookId, details)
  })

  $(document).on('click', '.add-btn', function() {
    $('#myModal').modal('show');
  })
})

// Get data for all books
const getAllBooks = () => {
  $.ajax({
    url: `${baseURL}/books`,
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
      <div class='edit-card hide-card'>
        <div class='row'>
          <div class='col-sm-3 image-holder'>
            <img class='thumbnail' src=${book.image} alt='Book Cover Image' height='230px' width='160px'>
          </div>
          <div class='col-sm-9'>
            <div class=card-block>
              <h2 class='card-title'>${book.title}</h2>
              <p class='card-text'>Author: ${book.author}</p>
              <p class='card-text'>Release Date: ${book.releaseDate}</p>
              <button class='btn btn-primary close-btn'>Close</button>
            </div>
          </div>
        </div>
      </div>
      <div class='edit-card hide-card'>
        <div class='row'>
          <div class='col-sm-3 image-holder'>
            <img class='thumbnail' src=${book.image} alt='Card image cap' height='230px' width='160px'>
          </div>
          <div class='col-sm-9'>
            <h2>Edit book details</h2>
            <form class='edit-form'>
              <div class='input-section'>
                <label for='title' class='col-sm-3 col-form-label'>Title</label>
                <div class='form-input col-sm-9'>
                  <input type='text' class='form-control' id='title' value="${book.title}"'>
                </div>
               </div>
              <div class='input-section'>
                <label for='author' class='col-sm-3 col-form-label'>Author</label>
                <div class='form-input col-sm-9'>
                  <input type='text' class='form-control' id='author' value="${book.author}"'>
                </div>
               </div>
              <div class='input-section'>
                <label for='edit-date' class='col-sm-3 col-form-label'>Release Date</label>
                <div class='form-input col-sm-9'>
                  <input type='text' class='form-control' id='date' value="${book.releaseDate}"'>
                </div>
              </div>
              <div class='edit-btns'>
                <button type='submit' class='btn btn-primary form-btn upload-btn'>Upload Image</button>
                <button type='submit' class='btn btn-primary form-btn submit-btn'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `)
  })
}

// Delete book entry from the page

const deleteOneBook = (bookId) => {
  $.ajax({
    url: `${baseURL}/books/${bookId}`,
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

// Edit book details
const editBookDetails = (bookId, updatedDetails) => {
  $.ajax({
    url: `${baseURL}/books/${bookId}`,
    contentType: 'application/json',
    method: 'put',
    data: JSON.stringify(updatedDetails)
  })
  .done(function(response) {
    alert('Book updated successfully!')
  })
  .catch(error => {
    console.error('Error: ', error)
    alert('Oh no! Something when wrong. Please try again.')
  })
}
