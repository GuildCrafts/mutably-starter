const express = require('express')
const path = require('path')
const app = express()
const api = require('./controllers/index')

// set 'html' as the engine, using ejs's renderFile function
var pug = require('pug');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static('public'))

app.use('/', api)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
