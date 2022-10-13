const express = require('express');
const app = express();
const path = require('path')
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/ac-news"
const port = 4000;

const client = new MongoClient(url);

app.get("/" , (req,res) => {
 
    var perPage = 7 ;
    var page = 1 ;
    const database = client.db("ac-news");
    const news = database.collection("news");
    const query = { };
    const cursor = news.find(query)
    .skip((perPage * page) - perPage)
    .limit(perPage);
    let results = []
    cursor.forEach(value => results.push(value)).then( () => {
      res.status(200).render('index' , {
        results,
        perPage,
        page
      })
    });
})

app.get("/2r" , (req,res) => {
 
  var perPage = 7 ;
  var page = req.query.p ;
  const database = client.db("ac-news");
  const news = database.collection("news");
  const query = { };
  const cursor = news.find(query)
  .skip((perPage * page) - perPage)
  .limit(perPage);
  let results = []
  cursor.forEach(value => results.push(value)).then( () => {
    res.status(200).render('index2' , {
      results,
      perPage,
      page
    })
  });
})

app.get("/form",(req,res) => {
  res.status(200).render("form")
})
app.use('/static', express.static('static'))
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.listen(port, () => {
	console.log(`The application started successfully on port ${port}`);
});

