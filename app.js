const express = require('express');
const app = express();
const path = require('path')
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/ac-news"
const port = 4000;

const client = new MongoClient(url);

// async function run() {
//   try {
//     const query = { };
//     const options = {projection: { author: 1 ,_id : 0 }};
//     const cursor = news.find(query,options).skip(5).limit(5);
//     await cursor.forEach(console.log);
  
//     await cursor.close();
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);

app.get("/" , (req,res) => {
    var perPage = 7 ;
    var page = req.query.p || 1 ;

    const database = client.db("ac-news");
    const news = database.collection("news");
    const query = { };
    // const options = {projection: { author: 1 ,_id : 0 }};
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
      // cursor.close()
      // client.close()
    });
})

app.use('/static', express.static('static'))
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.listen(port, () => {
	console.log(`The application started successfully on port ${port}`);
});

