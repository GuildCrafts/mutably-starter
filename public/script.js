console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  // code in here
  var listOfBooks = [];

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

$('.panel-heading').empty()
$('.panel-heading').append('<label for="fname">Enter Book</label> <input type="text" name="something" id="something" placeholder="Enter Book" />');
$('.panel-heading').append('<label for="fname">Enter Author</label> <input type="text" name="something" id="something" placeholder="Enter Author" />');
$('.panel-heading').append('<input type="button" value="Add Book">');



});
