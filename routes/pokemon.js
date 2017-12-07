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


// app.delete('/pokemon/deleteAll ', (request, response) {
//
// }
