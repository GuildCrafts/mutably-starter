console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  const baseURL = 'http://mutably.herokuapp.com'

  getAllBooks(baseURL)

  // Create the html grid system for each of the returning books.
});




const getAllBooks = (baseURL) => {
  $.ajax({
    url: `${baseURL}/books`,
    contentType: 'application/json',
    success: (response) => {
      const list = $('.list-group')[0]
      response.books.forEach((book) => {
        $('.list-group').append(`
          <li class='list-group-item'>${book.title}
            <div class='list-btns'>
              <button type='button' class='btn btn-default'>View</button>
              <button type='button' class='btn btn-default'>Edit</button>
              <button type='button' class='btn btn-default'>Delete</button>
            </div
          </li>
        `)
      })
    }
  })
}
