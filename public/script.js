console.log("Sanity Check: JS is working!");

$(document).ready(function(){
  fetch('https://mutably.herokuapp.com/books')
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
});
