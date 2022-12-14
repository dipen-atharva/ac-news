const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const MongoStore = require('connect-mongo');
const isLoggedIn = require("./middleware/isLoggedIn.js");
const path = require('path');
const oneDay = 1000 * 60 * 60 * 24;
const port = 4000;
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/ac-news';
const News = require('./models/news');
const userDetails = require('./models/userDetails');
const { scrypt } = require('node:crypto');


//  Database Connection
function connect() {
  mongoose.connection
    .on('error', console.log)

    .on('disconnected', connect);
  return mongoose.connect(url, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
connect();

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
  News.find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function (err, doc) {
      if (err) { res.status(500).json(err); return; };
      res.status(200).render('index', {
        doc,
        perPage,
        page
      })
    });
})

app.get('/2r', isLoggedIn, (req, res) => {

  var perPage = 7
  var page = req.query.p
  News.find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function (err, doc) {
      if (err) { res.status(500).json(err); return; };
      res.status(200).render('index2', {
        doc,
        perPage,
        page
      })
    });
})

app.get('/protected_page', isLoggedIn, (req, res) => {
  if (isLoggedIn) {
    res.status(200).render('protected_page')
  } else {
    res.redirect('/auth')
  }
})

app.post('/formdata', (req, res) => {
  News.create(req.body)
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
  const { username, password } = req.body
  console.log("+++++++++authdata++", username, password)
  userDetails.findOne({ 'username': `${username}` })
    .then((userdetails) => {
      console.time("scrypt genrating hash with salt");
      scrypt(password, userdetails.password_salt, 64, (err, derivedKey) => {
        if (err) throw err;
        body_password = derivedKey.toString('hex');
        console.timeEnd("scrypt genrating hash with salt");
        if (body_password === userdetails.password) {
          req.session.userId = req.body.username;
          console.log("++CREATED++", req.session, req.session.userId)
          res.status(200).send({result: 'redirect', url:'/protected_page'})
        }
      })
    }).catch(err => {
      console.log(err)
      console.log(`Account with ${username} username don't exist.`)
      res.status(401).send({result: 'error' , error_message : `Account with <b>${username}</b> username don't exist.`})
    })
})

// CREATE ACCOUNT
app.post('/authdata2', (req, res) => {
  const { username, password } = req.body
  console.log("+++++++++authdata2++", username, password)
  userDetails.findOne({ 'username': `${username}` }).then((userdetails) => {
    if (userdetails && username === userdetails.username) {
      res.status(401).send({result: 'error' , error_message : `<b>${username}</b> username already exist.`});
    } else {
      userDetails.create({ 'username': `${username}`, 'password': `${password}` })
        .then(() => {
          req.session.userId = req.body.username;
          console.log("+++++++++CREATED++", req.session, req.session.userId)
          res.status(200).send({result: 'redirect', url:'/protected_page'})
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
