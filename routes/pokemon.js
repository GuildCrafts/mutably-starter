const express = require('express');
const app = express();


const pokemon = require('../seed/pokemon.js')


app.get('/pokemon/getAll', (request, response) => { //json.stringify express
  if(!req.body.pokemon) {
    return 'faiiiiil'
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.json(JSON.stringify(pokemon));
  }
})
 console.log(JSON.stringify(pokemon));


app.delete('/pokemon/remove/:id',(request, response ) =>  {
  const element = request.params.id
  if(!request.params.id) {
    return 'nonononono'
  } else if (typeof element === 'integer'){
    res.setHeader('Content-Type', 'application/json')
    function remove (pokemon, element) {
    const index = pokemon.indexOf(element);
    return pokemon.splice(index, 1);
  }
  res.json(JSON.stringify(element))
}
console.log(JSON.stringify(element));
})
