$(document).ready(function(){

createBookRow = (title, author) => {
  $('.list-group').append(
    `<li class="row">
      <button class="editButton">Edit</button>
      <button class="saveButton invisible">Save</button>
      <p>` + title + `</p>
      <p>` + author + `</p>
      <button class="deleteButton">Delete</button>
    </li>`)
}

$('button.editButton').on('click', () => {
  $('button.editButton').addClass('invisible')
  $('button.saveButton').removeClass('invisible')
})

// for(i=0; i<$(button.saveButton).length i++){
  $('button.saveButton').on('click', () => {
    // $('button.saveButton').toggle()
    $('button.saveButton').addClass('invisible')
    $('button.editButton').removeClass('invisible')
    // console.log($('button.editButton')[0])
  })
// }

$()

const testRun = $.getJSON('https://mutably.herokuapp.com/books')
console.log('keys:', Object.keys(testRun))
console.log('testRun:', testRun)

const getStuff = $.ajax({
  type: 'GET',
  url: 'https://mutably.herokuapp.com/books',
  success: (data) => {
    console.log('success:', data.books[0].title)
  }
})



createBookRow('The Cat in the Hat', "Dr. Seuss")

});
