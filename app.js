const express = require('express');
const app = express();
const path = require("path");
const port = 4000;

const data =[
   {
       "author": "TMZ Staff",
       "title": "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
       "description": "Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it's just too damn unsafe for him to travel to America during the COVID-19 pandemic. \"The situation is very complicated worldwide,\" Nadal wrote in a statement. \"The…",
       "url": "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
       "source": "TMZ.com",
       "image": "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
       "category": "general",
       "language": "en",
       "country": "us",
       "published_at": "2020-08-05T05:47:24+00:00"
   },
   {
      "author": "TMZ Staff",
      "title": "Nicki Minaj's Husband Gets Permission To Be There For Baby's Birth",
      "description": "Kenneth can be in the room when Nicki gives birth ... a judge just granted his request to tweak his pre-trial release conditions so he can travel with Nicki. With the court's order in place, KP can travel with Nicki periodically on biz…",
      "url": "https://www.tmz.com/2020/07/30/nicki-minaj-husband-asks-judge-be-there-child-birth/",
      "source": "TMZ.com",
      "image": "https://imagez.tmz.com/image/c1/4by3/2020/07/30/c115ad2dc849438a97a0ad3097b416df_md.jpg",
      "category": "general",
      "language": "en",
      "country": "us",
      "published_at": "2020-08-01T05:34:47+00:00"
  },
  {
      "author": "Michael Rothstein",
      "title": "New Lions safety Jayron Kearse suspended three games",
      "description": "Kearse, 26, signed with the Lions in March after four seasons in Minnesota, where he played in 62 games with five starts, making 79 tackles and defending eight passes.",
      "url": "https://www.espn.com/nfl/story/_/id/29572640/new-lions-safety-jayron-kearse-suspended-three-games",
      "source": "ESPN",
      "image": "https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2020%2F0111%2Fr651071_1296x729_16%2D9.jpg",
      "category": "sports",
      "language": "en",
      "country": "us",
      "published_at": "2020-07-31T23:23:14+00:00"
  },
  {
   "author": "TMZ Staff",
   "title": "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
   "description": "Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it's just too damn unsafe for him to travel to America during the COVID-19 pandemic. \"The situation is very complicated worldwide,\" Nadal wrote in a statement. \"The…",
   "url": "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
   "source": "TMZ.com",
   "image": "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
   "category": "general",
   "language": "en",
   "country": "us",
   "published_at": "2020-08-05T05:47:24+00:00"
   },
   {
   "author": "TMZ Staff",
   "title": "Nicki Minaj's Husband Gets Permission To Be There For Baby's Birth",
   "description": "Kenneth can be in the room when Nicki gives birth ... a judge just granted his request to tweak his pre-trial release conditions so he can travel with Nicki. With the court's order in place, KP can travel with Nicki periodically on biz…",
   "url": "https://www.tmz.com/2020/07/30/nicki-minaj-husband-asks-judge-be-there-child-birth/",
   "source": "TMZ.com",
   "image": "https://imagez.tmz.com/image/c1/4by3/2020/07/30/c115ad2dc849438a97a0ad3097b416df_md.jpg",
   "category": "general",
   "language": "en",
   "country": "us",
   "published_at": "2020-08-01T05:34:47+00:00"
   },
   {
   "author": "Michael Rothstein",
   "title": "New Lions safety Jayron Kearse suspended three games",
   "description": "Kearse, 26, signed with the Lions in March after four seasons in Minnesota, where he played in 62 games with five starts, making 79 tackles and defending eight passes.",
   "url": "https://www.espn.com/nfl/story/_/id/29572640/new-lions-safety-jayron-kearse-suspended-three-games",
   "source": "ESPN",
   "image": "https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2020%2F0111%2Fr651071_1296x729_16%2D9.jpg",
   "category": "sports",
   "language": "en",
   "country": "us",
   "published_at": "2020-07-31T23:23:14+00:00"
   }
]
var trimeddata = [];
function paginator(items, current_page, per_page_items) {
	let page = current_page || 1,
	per_page = per_page_items || 10,
	offset = (page - 1) * per_page,

	paginatedItems = items.slice(offset).slice(0, per_page_items)
   trimeddata = paginatedItems
	return trimeddata;
}
paginator(data,1,3);
// console.log(trimeddata)

app.use('/static', express.static('static')) 
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.get('/',(req, res)=>{
   res.status(200).render('index',{trimeddata : trimeddata});
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

