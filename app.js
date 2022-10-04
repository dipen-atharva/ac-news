const express = require('express');
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const port = 4000;

// Database Connectivity
mongoose.connect('mongodb://localhost:27017/ac-news');
mongoose.connection.on('open', function () {
	console.log('Mongoose connected.');
});

let newsSchema = new mongoose.Schema({
	// _id:mongoose.Schema.Types.ObjectId(),
	author: String,
	title: String,
	description: String,
	url: String,
	source: String,
	image: String,
	category: Array,
	language: String,
	country: String,
	published_at: String,
	published: String
})

const News = mongoose.model('news', newsSchema);

app.get('/', (req, res) => {
	News.find({}, function (err, news) {
		if (err) console.log(err);
		// const totalRec = Object.keys(news).length
		// console.log(Object.keys(news).length)
		const pageSize = 7
		// var pageCount = Math.ceil(totalRec / pageSize)
		var start = 0
		var currentPage = req.query.p

		if (currentPage > 1) {
			start = (currentPage - 1) * pageSize;
		}
		console.log("pageCount: "  + " totalRec: "  + " start: " + start)

		var postList = news.slice(start, start + pageSize)
		// console.log(postList) 
		res.status(200).render('index', {
			postList: postList,
			// totalRec: totalRec,
			pageSize: pageSize,
			// pageCount: pageCount,
			start: start,
			currentPage: currentPage
		})
		// res.status(200).render('index',{news : news});
	})
})

app.use('/static', express.static('static'))
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

// app.get('/',(req, res)=>{
//    res.status(200).render('index',{data : data});
// })

app.listen(port, () => {
	console.log(`The application started successfully on port ${port}`);
});

