const express = require('express');
const app = express();
const path = require("path");
const port = 4000;

app.use('/static', express.static('static')) 
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res)=>{
    const data = [{
               author: "Team Register",
               category: [
                  "technology"
               ],
               description: "CI/CD benchmarks for the development of high performing teams Webinar  There are lots of theories about what it takes to build a high performing organization or team.…",
               id: "df2c2c2b-d560-4e1b-ad4c-f5d8e4b159f1",
               language: "en",
               published: "2022-09-27 11:18:55 +0000",
               title: "Learn fast off the blocks for software development",
               url: "https://go.theregister.com/feed/www.theregister.com/2022/09/27/learn_fast_off_the_blocks/"
            } ,
            {
                author: "japantimes",
                category: [
                   "general"
                ],
                description: "The online streaming giant is aiming to be less reliable on third-party creators and to expand its gaming offerings.",
                id: "d5ca690c-c3eb-4c16-b3e2-bd4f34a589a7",
                image: "None",
                language: "en",
                published: "2022-09-27 11:18:39 +0000",
                title: "Netflix sets up first internal games studio in push to retain subscribers",
                url: "https://www.japantimes.co.jp/news/2022/09/27/business/netflix-develop-video-games/"
             },
             {
                author: "japantimes",
                category: [
                   "general"
                ],
                description: "The NFL said the new format will allow players to showcase their football and non-football skills in unique competitions in a fun way.",
                id: "485ad108-6c55-455d-bd92-4cbc63141201",
                image: "None",
                language: "en",
                published: "2022-09-27 11:18:39 +0000",
                title: "Pro Bowl to be replaced by skills competition and flag football game",
                url: "https://www.japantimes.co.jp/sports/2022/09/27/more-sports/football/nfl-pro-bowl-flag-football/"
             },
             {
                author: "japantimes",
                category: [
                   "general"
                ],
                description: "The 2021 Masters champion delighted huge galleries on home soil a year ago as he was cheered to a five-shot victory at Narashino Country Club in Chiba.",
                id: "4bf611ba-6add-4941-85b3-7b1479a09f67",
                image: "None",
                language: "en",
                published: "2022-09-27 11:18:39 +0000",
                title: "Hideki Matsuyama to defend Zozo Championship in Japan",
                url: "https://www.japantimes.co.jp/sports/2022/09/27/more-sports/golf/zozo-matsuyama-participation/"
             },
             {
                author: "japantimes",
                category: [
                   "general"
                ],
                description: "The seven-day average of new cases in the capital came to 6,501.0, compared with 7,430.3 a week earlier.",
                id: "db5fcf7c-154d-4fe4-8c0f-689007e1b474",
                image: "None",
                language: "en",
                published: "2022-09-27 11:18:39 +0000",
                title: "COVID-19 tracker: Tokyo reports 5,247 new cases",
                url: "https://www.japantimes.co.jp/news/2022/09/27/national/covid-tracker-september-27/"
             },
             {
                author: "japantimes",
                category: [
                   "general"
                ],
                description: "Huge throngs gathered around the Nippon Budokan for what may be remembered as one of the most controversial ceremonial events in Japan in recent years.",
                id: "f5b867b6-fe0a-4612-b197-e8096ea6f1a3",
                image: "None",
                language: "en",
                published: "2022-09-27 11:18:39 +0000",
                title: "Respect and protest: Abe funeral draws large crowds with contrasting aims",
                url: "https://www.japantimes.co.jp/news/2022/09/27/national/shinzo-abe-state-funeral-crowds/"
             },
             {
                author: "japantimes",
                category: [
                   "general"
                ],
                description: "Afghanistan's economy is collapsing, 19 million people are at risk of acute hunger and the investment the Taliban were counting on from Beijing hasn't arrived.",
                id: "e9930dc4-cc01-48e9-bfa0-43b81efde342",
                image: "None",
                language: "en",
                published: "2022-09-27 11:18:39 +0000",
                title: "China wooed Taliban with investment promises that haven't panned out",
                url: "https://www.japantimes.co.jp/news/2022/09/27/asia-pacific/politics-diplomacy-asia-pacific/china-taliban-investment-promises/"
             },
             {
                author: "japantimes",
                category: [
                   "general"
                ],
                description: "Former Prime Minister Shinzo Abe's economic policies were a mixed bag for Japan — still, he successfully pushed the country to re-imagine itself.",
                id: "d6565a10-e075-4945-9d66-527c2b4440c3",
                image: "None",
                language: "en",
                published: "2022-09-27 11:18:39 +0000",
                title: "The legacy of Abenomics lies between two extremes",
                url: "https://www.japantimes.co.jp/opinion/2022/09/27/commentary/japan-commentary/abes-abenomics/"
             },
             {
                author: "japantimes",
                category: [
                   "general"
                ],
                description: "Before the war, Saudi Arabia — and Prince Mohammed in particular — was still struggling to overcome diplomatic isolation resulting from the 2018 killing of journalist Jamal Khashoggi.",
                id: "b3e1a24f-0f91-422f-94bb-fbf9571d74c1",
                image: "None",
                language: "en",
                published: "2022-09-27 11:18:39 +0000",
                title: "As Ukraine war grinds on, Saudi influence grows",
                url: "https://www.japantimes.co.jp/news/2022/09/27/asia-pacific/politics-diplomacy-asia-pacific/ukraine-war-saudi-influence/"
             },
             {
                author: "japantimes",
                category: [
                   "general"
                ],
                description: "Partisan bickering over Shinzo Abe's state memorial was an embarrassment for the nation on the world stage.",
                id: "2d2538ad-bad1-473d-b45f-4a790ed33d4e",
                image: "None",
                language: "en",
                published: "2022-09-27 11:18:39 +0000",
                title: "Shinzo Abe's funeral furor is Japan's most unedifying debate",
                url: "https://www.japantimes.co.jp/opinion/2022/09/27/commentary/japan-commentary/japan-state-funeral/"
             },
             {
                author: "japantimes",
                category: [
                   "general"
                ],
                description: "The world's biggest oil exporter has leveraged its immense wealth to assert itself on the esports stage, hosting glitzy conferences and snapping up established tournament organizers.",
                id: "61d4c273-2bfa-4f18-a6e2-9a2c6f757ade",
                image: "None",
                language: "en",
                published: "2022-09-27 11:18:39 +0000",
                title: "With a gamer prince and oil billions, Saudi Arabia turns to esports",
                url: "https://www.japantimes.co.jp/sports/2022/09/27/more-sports/saudi-arabia-esports-boom/"
             },
             {
                author: "japantimes",
                category: [
                   "general"
                ],
                description: "Shinzo Abe's divisive legacy was manifest on the streets of Tokyo, in displays of both public mourning and protest.",
                id: "e2e53c6c-5e47-42a7-9e13-809f02db4dda",
                image: "None",
                language: "en",
                published: "2022-09-27 11:18:39 +0000",
                title: "In pictures: Shinzo Abe's state-sanctioned farewell",
                url: "https://www.japantimes.co.jp/news/2022/09/27/national/abe-state-funeral-photos/"
             }
          ]     
    res.status(200).render('index', {data : data});
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

