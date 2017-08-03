const express = require('express')

const app = express()
app.use(express.static('public'))
const ejs = require('ejs')

app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

app.get('/', (request, response) => {
    response.render('index')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
