console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  // code in here
  var listOfBooks = [];

  fetch("http://mutably.herokuapp.com/books").then(function(response){
    return response.json()
  }).then(function(bookData){
    for (var i in bookData) {
    for (var j in bookData[i]){
        console.log(bookData[i][j]);
        listOfBooks.push(bookData[i][j].title + " " + "Author " + bookData[i][j].author)
    }
    document.querySelector(".list-group").innerText = JSON.stringify(listOfBooks)
}
  console.log(listOfBooks)

    
  })



});
