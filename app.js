const express = require('express');
const app = express();
const path = require("path");
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/ac-news"
const port = 5000;
app.get('/',async (req, res) => {

  async function asyncCall() {

    const client = await MongoClient.connect(url, { useNewUrlParser: true })
                  .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    try {
        const db = client.db("ac-news");
        let collection = db.collection('news');
        // let query = { author : "TMZ Staff" }
        let result = await collection.find().toArray();
        console.log(result);
    } catch (err) {
        console.log(err);
    } finally {
        // client.close();
    }
  }
  result = await asyncCall();
  // console.log(typeof(result))
  res.status(200).render("index" , {result : result});
})

app.use('/static', express.static('static'))
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.listen(port, () => {
	console.log(`The application started successfully on port ${port}`);
});

