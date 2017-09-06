const url = 'http://mutably.herokuapp.com/albums'
const getAlbums = document.querySelector('.get-albums')
const listGroup = document.querySelector('.list-group')

$(document).ready(function(){
  getAllAlbums()

  $(document).on('click', '.save-btn', function() {

    })

  $(document).on('click', '.edit-btn', function() {

    })

  $(document).on('click', '.delete-btn', function() {
      $.ajax({
        method: 'DELETE',
        url: url + id,
        success: deleteAlbum
      })
    })
});

const checkStatus = response =>  {
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

const getJSON = response => {
  return response.json()
}

const getAllAlbums = () => {
  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: headers
    })
    .then(checkStatus)
    .then(getJSON)
    .then( albums => console.log(albums) )
    .catch(err => console.log(err) )
}

const addAlbum = () => {

}

const updateAlbum = id => {

}

const deleteAlbum = id => {

}
