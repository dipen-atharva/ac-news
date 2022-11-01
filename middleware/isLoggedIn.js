module.exports = function isLoggedIn(req, res, next) {
  var cookie = req.cookies;
  const MongoClient = require('mongodb').MongoClient;
  const url = 'mongodb://localhost:27017/ac-news';
  const port = 4000;
  const client = new MongoClient(url);
  const database = client.db('ac-news')
  const userDetails = database.collection('userDetails')
  userDetails.findOne({ 'username': `${cookie.username}` }).then((userdetails) => {
    if (cookie.username && cookie.username == userdetails.username) {
      next();
    } else {
      res.send('You are not logged in')
    }
  });
};