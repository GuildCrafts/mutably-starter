console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  // code in here
  fetch("http://mutably.herokuapp.com/books").then(function(response){
    return response.json()
  }).then(function(j){
    console.log(j)

    document.querySelector(".list-group").innerText = JSON.stringify(j);
  })



});
