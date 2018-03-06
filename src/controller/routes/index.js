const router = require('express').Router() ///just a consolidation of routes like central command . u have it becasue u want to be able to modularize this pokemon code.

const pokemonRouter = require('./pokemon.js')


router.use(pokemonRouter)
router.get('/', (res, req) => {
  res.render('index')
  
})







module.exports = router //this whole file is makin our code modular. we've imported into this router
