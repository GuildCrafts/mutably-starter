console.log("GOOD MUSIC is live!");

$(document).ready(function(){

  // get all the data on load of the page
  getAllalbums();

  $('#new-album-form').on('submit', function(event) {
    event.preventDefault()
    var newAlbumData = $(this).serialize();
    console.log(newAlbumData);
    $(this).trigger("reset");
    $.ajax({
      method: 'POST',
      url: 'http://mutably.herokuapp.com/albums/',
      data: newAlbumData,
      success: handleAlbumAddResponse
    })
  })

  // becasue the delete-btn is added dynamically, the click handler needs to be written like such, bound to the document
  $(document).on('click', '.delete-btn', function() {
    var id = $(this).data('id')
    $.ajax({
      method: 'DELETE',
      url: 'http://mutably.herokuapp.com/albums/'+id,
      success: handleAlbumDeleteResponse
    })
  })

  $(document).on('click', '.edit-btn', function() {
    var id = $(this).data('id')

    // hide the static name, show the input field
    $('.name-'+id).hide()
    $('.input-'+id).show()

    // hide the edit button, show the save button
    $('.edit-'+id).hide()
    $('.save-'+id).show()

  })

  $(document).on('click', '.save-btn', function() {
    var id = $(this).data('id')

    // grab the user's inputted data
    var updatedname = $('.input-'+id+' input').val()
    $.ajax({
      method: 'PUT',
      url: 'http://mutably.herokuapp.com/albums/'+id,
      data: {name: updatedname},
      success: handleAlbumUpdateResponse
    })
  })
});

function getAllalbums() {
  $('.row').html('')
  $.ajax({
    method: 'GET',
    url: 'http://mutably.herokuapp.com/albums'
  }).done(function(data) {
    for (var i=0; i<data.albums.length; i++) {
      $('.row').append('<div class="col-sm-4 col-md-2-'+data.albums[i]._id+'">'
      +'<div class="thumbnail"><h3><span class="center-name name-'+data.albums[i]._id+'">&nbsp;'+data.albums[i].name+'</span></h3>'
      +'<span class="form-inline edit-form input-'+data.albums[i]._id+'">&nbsp;<input class="form-control" value="'+data.albums[i].name+'"/></span>'
      +'<img src="https://f4.bcbits.com/img/0001215340_10.jpg" alt="..."><div class="caption"><h4>'+data.albums[i].artistName+'</h4><p class="shadows">'+data.albums[i].genres+'</p></div>'
      +'<button class="btn btn-primary edit-btn edit-'+data.albums[i]._id+'" data-id="'+data.albums[i]._id+'">Edit</button>'
      +'<button class="btn btn-success save-btn save-'+data.albums[i]._id+'" data-id="'+data.albums[i]._id+'">Save</button>'
      +'<button class="btn btn-danger delete-btn pull-right" data-id="'+data.albums[i]._id+'">Delete</button>')
    }
  })
}


function handleAlbumAddResponse(data) {
  console.log(data);
  // reretrieve and rerender all the albums
  getAllalbums();
}

function handleAlbumDeleteResponse(data) {
  console.log('handleAlbumDeleteResponse got ', data);
  var albumId = data._id;
  var $row = $('.col-md-2-' + albumId);
  // remove that album row
  $row.remove();
}

function handleAlbumUpdateResponse(data) {
  var id = data._id;

  // replace the old name with the new name
  $('.name-'+id).html('&nbsp;'+data.name)

  $('.name-'+id).show()
  $('.input-'+id).hide()
  $('.edit-'+id).show()
  $('.save-'+id).hide()
}
