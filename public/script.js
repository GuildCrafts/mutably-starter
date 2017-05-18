console.log("Sanity Check: JS is working!");

$(document).ready(function(){


  // collect every pokemon we know
  catchEmAll();

  document.getElementById("image").style.visibility = "hidden";


  $('#new-pokemon-entry').on('submit', function(event) {
    event.preventDefault()
    var url = "https://img.pokemondb.net/artwork/";
    var pokeName = $("#name").val().toLowerCase()


    $("#image").val(url + pokeName + ".jpg")
    var newPokeData = $(this).serialize()
    console.log("I did a thing");
    $(this).trigger("reset");
    $.ajax({
      method: 'POST',
      url: 'http://mutably.herokuapp.com/pokemon/',
      data: newPokeData,
      success: newPokeDataResponse
    })
  })

  // release pokemon
  $(document).on('click', '.delete-btn',function () {
    var id = $(this).data('id')
    $.ajax({
      method: 'DELETE',
      url: 'http://mutably.herokuapp.com/pokemon/'+id,
      success: releasePokeDataResponse
    })

  })

  $(document).on('click', '.edit-btn', function () {
    var id = $(this).data('id')

    $('.btn-danger').hide()
    $('.name-'+id).hide()
    $('.input-'+id).show()

    $('.edit-'+id).hide()
    $('.save-'+id).show()
  })

  // $pokemon has been caught!
  $(document).on('click', '.save-btn', function () {
    var id = $(this).data('id')
    var caughtPokemon = $('.input-'+id+' input').val()
    //grab all the existing data on current pokemon
    $.ajax({
      method: 'GET',
      url: 'http://mutably.herokuapp.com/pokemon/'+id,
    }).done(function(data){
      var dexNum = data.pokedex
      var evolved = data.evolves_from
      var visual = data.image
      // send old static data, + new name along
      $.ajax({
        method: 'PUT',
        url: 'http://mutably.herokuapp.com/pokemon/'+id,
        data: {name: caughtPokemon, pokedex: dexNum, evolves_from: evolved, image: visual},
        success: catchPokeDataResponse
      })
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
      +'<span class="name-'+data.pokemon[i]._id+'">&nbsp;'+data.pokemon[i].name+'&nbsp;'+data.pokemon[i].pokedex+'&nbsp;'+ "Evolves From " +data.pokemon[i].evolves_from+ '</span>'


      +'<span class="form-inline edit-form input-'+data.pokemon[i]._id+'">&nbsp;<input class="form-control" value="'+data.pokemon[i].name+'"/></span>'
      +'<button class="btn btn-danger delete-btn right red" data-id="'+data.pokemon[i]._id+'">Release<i class="material-icons right">call_made</i></button>'
      +'</li>')
      $('.save-'+data.pokemon[i]._id).hide()
      $('.carousel').append('<a class="carousel-item"><img src="'+data.pokemon[i].image+'">'+'</a>')
    }
    $('.carousel').carousel();
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
  $('.name-'+id).html('&nbsp;'+data.name+'&nbsp'+data.pokedex+'&nbsp;'+ "Evolves From "+data.evolves_from)
  $('.btn-danger').show()
  $('.name-'+id).show()
  $('.input-'+id).hide()
  $('.edit-'+id).show()
  $('.save-'+id).hide()
}
