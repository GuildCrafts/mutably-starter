const pokemon = require('../model/seeds/pokemon.js')

function remove (element) {
  pokemon.splice(element, 1)
  return pokemond
}

module.exports = {
  remove

}
