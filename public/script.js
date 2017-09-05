console.log("Sanity Check: JS is working!");
const getAlbums = document.querySelector('.get-albums')
const listGroup = document.querySelector('.list-group')
getAlbums.addEventListener("click", function(event){
    // event.preventDefault()
    getAllAlbums
});

function getAllAlbums() {
  // prevent.default()
  alert("it works!")
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  fetch('http://mutably.herokuapp.com/albums', {
    method: 'GET',
    mode: 'cors',
    headers: headers
  }).then( albums => {
    albums = albums.json()
    return albums
  }).then(albums => {
  console.log(albums[0])
  });
}

// $(document).ready(function(){
//
//
//
// });
