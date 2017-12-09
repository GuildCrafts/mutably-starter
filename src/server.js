const express = require('express');//this file is only when we want to set things up like our public directory as static files, our ejs, our env port. it doesn't have routes
const app = express()
const path = require('path');
const routes = require('./controller/routes')

app.use(express.static('public'))

// set 'html' as the engine, using ejs's renderFile function
require('ejs');
// app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'))//gives this access to the views folder above so u can acces ur index. explicily defines views direcotry becasue app will reference it. sets views directory and joins the current direcotyr

app.use(routes)










const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
