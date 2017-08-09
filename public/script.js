$(document).ready(function(){

createBookRow = (title, author) => {
  $('.list-group').append(
    `<li class="row">
      <button class="editButton col-md-2">Edit</button>
      <button class="saveButton col-md-2 invisible">Save</button>
      <p class="col-md-4">` + title + `</p>
      <p class="col-md-4">` + author + `</p>
      <button class="deleteButton col-md-2">Delete</button>
    </li>`)
}

const showAllBooks = () => {
  $.ajax({
    type: 'GET',
    url: 'https://mutably.herokuapp.com/books',
    success: (mutablyResponse) => {
      for (i=0; i<mutablyResponse.books.length; i++){
        createBookRow(mutablyResponse.books[i].title, mutablyResponse.books[i].author)
      }
    }
  })
}

showAllBooks()

const addBook = (title, author) => {
  event.preventDefault()
  $.ajax({
    type: 'POST',
    url: 'https://mutably.herokuapp.com/books',
    data: {title, author},
    success: () => {
      createBookRow(title, author)
    }
  })
}

$('button.addBook').on('click', () => {

  addBook("I'm a book!", "someone")
  const stuff = $('.new-book-form').serialize()
  console.log(stuff)
})


// createBookRow("geryfhiusdjk", "efhusdkj")
// createBookRow("geryfhiusdjk", "efhusdkj")
// createBookRow("geryfhiusdjk", "efhusdkj")
//
// $('button.editButton').on('click', () => {
//   $('button.editButton').addClass('invisible')
//   $('button.saveButton').removeClass('invisible')
// })
//
// // for(i=0; i<$(button.saveButton).length i++){
//   $('button.saveButton').on('click', () => {
//     // $('button.saveButton').toggle()
//     $('button.saveButton').addClass('invisible')
//     $('button.editButton').removeClass('invisible')
//     // console.log($('button.editButton')[0])
//   })
// // }

});
