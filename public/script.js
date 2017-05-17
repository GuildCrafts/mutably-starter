console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  // collect every pokemon we know
  catchEmAll();

  $('#new-pokemon-entry').on('submit', function(event) {
    event.preventDefault()
    var newPokeData = $(this).serialize()
    console.log("I did a thing");
    console.log(newPokeData);
    $(this).trigger("reset");
    $.ajax({
      method: 'POST',
      url: 'http://mutably.herokuapp.com/pokemon/',
      data: newPokeData,
      success: newPokeDataResponse
    })
  })

  // release pokemon
  $(document).on('click', '.delete-btn', function () {
    var id = $(this).data('id')
    $.ajax({
      method: 'DELETE',
      url: 'http://mutably.herokuapp.com/pokemon/'+id,
      success: releasePokeDataResponse
    })
  })

  $(document).on('click', '.edit-btn', function () {
    var id = $(this).data('id')

    $('.name-'+id).hide()
    $('.input-'+id).show()

    $('.edit-'+id).hide()
    $('.save-'+id).show()
    console.log("Im workinghere")
  })

  // $pokemon has been caught!
  $(document).on('click', '.save-btn', function () {
    var id = $(this).data('id')
    var caughtPokemon = $('.input-'+id+' input').val()
    $.ajax({
      method: 'PUT',
      url: 'http://mutably.herokuapp.com/pokemon/'+id,
      data: {name: caughtPokemon},
      success: catchPokeDataResponse
    })
  })
});

function catchEmAll () {
  $('.list-group').html('')
  $.ajax({
    method: 'GET',
    url: 'http://mutably.herokuapp.com/pokemon'
  }).done(function(data) {
    for (var i = 0; i < data.pokemon.length; i++) {
      $('.list-group').append('<li class="list-group-item item-'+data.pokemon[i]._id+'">'
      +'<button class="btn btn-primary edit-btn edit-'+data.pokemon[i]._id+'" data-id="'+data.pokemon[i]._id+'">Edit</button>'
      +'<button class="btn btn-success save-btn save-'+data.pokemon[i]._id+'" data-id="'+data.pokemon[i]._id+'">Save</button>'
      +'<span class="name-'+data.pokemon[i]._id+'">&nbsp;'+data.pokemon[i].name+'</span>'
      +'<span class="form-inline edit-form input-'+data.pokemon[i]._id+'">&nbsp;<input class="form-control" value="'+data.pokemon[i].name+'"/></span>'
      +'<button class="btn btn-danger delete-btn pull-right" data-id="'+data.pokemon[i]._id+'">Delete</button>'
      +'</li>')
      console.log(data.pokemon);
      $('.save-'+data.pokemon[i]._id).hide();
    }
  })
}

function newPokeDataResponse(data) {
  console.log(data);
  // rerun with all the new data, no full page refresh
  catchEmAll();
}

function releasePokeDataResponse (data) {
  console.log('releasePokeDataResponse got ', data);
  var pokeId = data._id;
  var $row = $('.item-' + pokeId);
  // "release" the pokemon on that row
  $row.remove();
}

function catchPokeDataResponse(data) {
  var id = data._id;

  // nickname the pokemon
  $('.name-'+id).html('&nbsp;'+data.name)

  $('.name-'+id).show()
  $('.input-'+id).hide()
  $('.edit-'+id).show()
  $('.save-'+id).hide()
}
