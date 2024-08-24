var express = require('express');
var app = express()
var path = require('path')

app.get(['/', '/index'], (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/about.html'))
})

app.get('/contact-me', (req, res) => {
  res.sendFile(path.join(__dirname, '/contact-me.html'))
})

var notFound = (req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '/404.html'))
}

app.use(notFound)

var PORT = 8080
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})


