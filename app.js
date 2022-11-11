const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const MongoStore = require('connect-mongo');
const isLoggedIn = require("./middleware/isLoggedIn.js");
const path = require('path');
const oneDay = 1000 * 60 * 60 * 24;

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/ac-news';
const port = 4000;
const client = new MongoClient(url, { monitorCommands: true });
client.on('commandStarted', (event) => console.debug(event));
client.on('commandSucceeded', (event) => console.debug(event));
client.on('commandFailed', (event) => console.debug(event));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/static', express.static('static'))
app.use(express.urlencoded({ extended: true }))

app.use(sessions({
  secret: 'a1b2c3d4e5f6',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/ac-news',
    autoRemove: 'native'
  })
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  var perPage = 7
  var page = 1
  const database = client.db('ac-news')
  const news = database.collection('news')
  const query = {}
  const cursor = news.find(query)
    .skip((perPage * page) - perPage)
    .limit(perPage)
  let results = []
  cursor.forEach(value => results.push(value)).then(() => {
    res.status(200).render('index', {
      results,
      perPage,
      page
    })
  })
})

app.get('/2r', isLoggedIn, (req, res) => {

  var perPage = 7
  var page = req.query.p
  const database = client.db('ac-news')
  const news = database.collection('news')
  const query = {}
  const cursor = news.find(query)
    .skip((perPage * page) - perPage)
    .limit(perPage)
  let results = []
  cursor.forEach(value => results.push(value)).then(() => {
    res.status(200).render('index2', {
      results,
      perPage,
      page
    })
  })
})

app.get('/protected_page', isLoggedIn, (req, res) => {
  if (isLoggedIn) {
    res.status(200).render('protected_page')
  } else {
    res.redirect('/auth')
  }
})

app.post('/formdata', (req, res) => {
  const database = client.db('ac-news')
  const news = database.collection('news')
  news.insertOne(req.body)
  res.send(`<p>title ${req.body.title}</p>
            <p>category ${req.body.category}</p>
            <p>url ${req.body.url}</p>
            <p>desc ${req.body.description}</p>
            <p>published-at${req.body.published_at}</p>`)
})

app.get('/auth', (req, res) => {
  res.status(200).render('auth')
})

// LOGIN
app.post('/authdata', (req, res) => {
  const database = client.db('ac-news')
  const userDetails = database.collection('userDetails')
  const { username, password } = req.body
  userDetails.findOne({ 'username': `${username}` })
    .then((userdetails) => {
      console.log(userdetails)
      if (username == userdetails.username && password == userdetails.password) {
        req.session.userId = req.body.username;
        console.log("++CREATED++", req.session, req.session.userId)
        res.redirect('protected_page')
      } else {
        res.redirect('/auth')
      }
    }).catch(err => {
      res.send(`Account with ${username} username don't exist.`)
      console.log(err)
    })
})

// CREATE ACCOUNT
app.post('/authdata2', (req, res) => {
  const database = client.db('ac-news')
  const userDetails = database.collection('userDetails')
  const { username, password } = req.body
  userDetails.findOne({ 'username': `${username}` }).then((userdetails) => {
    if (userdetails && username === userdetails.username) {
      res.send('username already exists');
    } else {
      userDetails.insertOne({ 'username': `${username}`, 'password': `${password}` })
        .then((userdetail) => {
          console.log(userdetail)
          req.session.userId = req.body.username;
          console.log("+++++++++CREATED++", req.session, req.session.userId)
          res.status(200).render('protected_page')
        })
    }
  })
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Session is destroyed')
      res.redirect('/auth')
    }
  });
});

app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`)
});
