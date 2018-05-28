const express = require('express');
const app = express()
console.log('May Node be with you')
const bodyParser= require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

//app.listen(3000, function() {
 // console.log('listening on 3000')
//})

app.get('/bla', function (req, res) {
//response.send("Hello World")  // do something here
res.sendFile('/home/ma.joshi/Documents/nodepro/index.html')
})

//app.post('/quotes', (req, res) => {
 // console.log('Hellooooooooooooooooo!')
// console.log(req.body)
//})

const MongoClient = require('mongodb').MongoClient


var db

MongoClient.connect('mongodb://mjnode:nodepassword@ds235840.mlab.com:35840/mjquotes', (err, client) => {
  if (err) return console.log(err)
  db = client.db('mjquotes') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})



app.set('view engine', 'ejs')



app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})
