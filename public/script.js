console.log("Sanity Check: JS is working!");

let pokemon = "";

$(document).ready(function(){
  $('list-group').html('');
  $.ajax({
  method: "GET",
  url: "https://mutably.herokuapp.com/pokemon",
  })
  .done(function(pokemonData) {
    for (i = 0; i < pokemonData.pokemon.length; i++) {
      const listPokemon = '.list-pokemon-' + pokemonData.pokemon[i]._id;
      const editPokemon = '.edit-pokemon-' + pokemonData.pokemon[i]._id;
      $('.edit-pokemon-' + pokemonData.pokemon[i]._id).hide();
      $('.list-group').append(function() {
        return "<li class=" + listPokemon + "> Pokemon ID: " + pokemonData.pokemon[i]._id + "<br> Pokemon Name: " + pokemonData.pokemon[i].name + "<br> Pokemon Pokedex #: " + pokemonData.pokemon[i].pokedex + "<br> Pokemon Evolves From: " + pokemonData.pokemon[i].evolves_from + "<br> Pokemon Image: <img src='" + pokemonData.pokemon[i].image + "'> <br>" + "<button class='button-edit'> Edit </button> <button class='button-delete'> Delete </button> <br> <br> </li>" + "<br>" + "<div class=" + editPokemon + "> Pokemon ID: " + pokemonData.pokemon[i]._id + "<br> Pokemon Name: " + pokemonData.pokemon[i].name + "<br> Pokemon Pokedex #: " + pokemonData.pokemon[i].pokedex + "<br> Pokemon Evolves From: " + pokemonData.pokemon[i].evolves_from + "<br> Pokemon Image: <img src='" + pokemonData.pokemon[i].image + "'> <br>" + "<button class='button-save'> Save </button> <br> <br> </div>";
      });
      $('.button-edit').click(function() {
        $(listPokemon).hide();
        $(editPokemon).show();
      });
      $('.button-save').click(function() {
        $(listPokemon).show();
        $(editPokemon).hide();
      });
    }
  });
});
