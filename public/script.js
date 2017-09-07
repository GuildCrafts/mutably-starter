console.log('Sanity Check: JS is working!');

$(document).ready(function(){

  // code in here
retriveBook()

  var listOfBooks = [];

function retriveBook() {
  fetch("http://mutably.herokuapp.com/books").then(function(response){
    return response.json()
  }).then(function(bookData){
     for (var i in bookData) {
     for (var j in bookData[i]){
        // console.log(bookData[i][j]);
        listOfBooks.push(bookData[i][j].title + " " + "Author " + bookData[i][j].author)
    }

    for (var i in listOfBooks) {
     $('.list-group').append( '<li>' + listOfBooks[i] + '</li>' );
  }
 }
})
}

$('.panel-heading').empty()
$('.panel-heading').append('<label for="fname">Enter Book</label> <input id="book" type="text" name="something" id="something" placeholder="Enter Book" />');
$('.panel-heading').append('<label for="fname">Enter Author</label> <input id="author" type="text" name="something" id="something" placeholder="Enter Author" />');
$('.panel-heading').append('<input class="addBooks" id="main" type="button" value="Add Book">');




$('#main').click(function() {
  let titleEntered = document.getElementById('book').value;
  let authorEntered = document.getElementById('author').value;

fetch('http://mutably.herokuapp.com/books', {
	method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
	body: JSON.stringify({
		title: titleEntered,
		author: authorEntered
	})
}).then(response => response.json())
  .then(response => $('.list-group').append( '<li>' +titleEntered + " " + "Author " + authorEntered  + '</li>' ))
  .then(response => $(clearField()));
  });


  function clearField() {
    document.getElementById('book').value = "";
    document.getElementById('author').value = "";
  }


});
