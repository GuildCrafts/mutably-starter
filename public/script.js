console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  const baseURL = 'http://mutably.herokuapp.com'

  getAllBooks(baseURL)

  $(document).on('click', '.view-btn', function() {
    $(this).parent().parent().next().toggleClass('hide-card')
  })

  $(document).on('click', '.close-btn', function() {
    $(this).parent().parent().toggleClass('hide-card');
  })
});

// Get data for all books
const getAllBooks = (baseURL) => {
  $.ajax({
    url: `${baseURL}/books`,
    contentType: 'application/json',
  })
  .done(function(response) {
    createListElement(response.books)
  })
  .catch(error => alert('Oh no! Something went wrong. Please try again.'))
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
        <img class="thumbnail" src=${book.image} alt="Card image cap" height='230px' width='160px'>
        <div class="card-block">
          <h2 class="card-title">${book.title}</h2>
          <p class="card-text">Author: ${book.author}</p>
          <p class="card-text">Release Date: ${book.releaseDate}</p>
          <button class="btn btn-primary close-btn">Close</button>
      </div>
    `)
  })
}

// Delete book entry from the page
