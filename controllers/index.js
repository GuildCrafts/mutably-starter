const express = require('express')
const router = express.Router();

router.get('/home', (request, response) => {
  console.log("ehadsfwewe")
  response.render('index')
})
router.get('/albums', (request, response) => {

  response.render('index')
})

router.post('/albums', (request, response) => {

  response.render('index')
})

router.get('/albums/:id', (request, response) => {

  response.render('index')
})

router.put('/albums/:id', (request, response) => {

  response.render('index')
})

router.delete('/albums/:id', (request, response) => {

  response.render('index')
})





module.exports = router
