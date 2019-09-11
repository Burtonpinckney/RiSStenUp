const RSSController = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../../models');
const Feed = require('rss-to-json');
const { JWTVerifier } = require('../../lib/passport');

//--RSS Scraper---------------------------------------------------------------

var teamP = 'https://www.panthers.com/rss/news'
var teamNC = 'http://gopack.com/rss.aspx?path=football'
// Routes
var teamSelected = 'panthers'
// A GET route for scraping the echoJS website
RSSController.get("/", JWTVerifier, function (req, res) {
  console.log('<==========================================>')
  const teamSelection = 'https://www.panthers.com/rss/news'
  // teamSelected === 'panthers'? (teamP):(teamNC)
  //const teamSelection = req.body.team

  Feed.load( teamSelection, function (err, rss) {
  //Confirms feed.load works but not database creation  
  // console.log(rss);
    rss.items.forEach(item => {

      //run cheerio on item.link to grab the article body, and assign it to a variable that we can pass to article.article_body

      var articleText;

      axios.get(item.link).then(function(res) {
        var $ = cheerio.load(res.data)
        $(".nfl-c-article__container").each(function(i, element){
          articleText = $(element).text();
          // console.log(articleText)
        })
      }).then(function(){
        var article = {
          title: item.title,
          link: item.link,
          article_body: articleText, //cheerio scrape item.link for this
          team: teamSelection,
          img_url: item.media.content[0].url[0],
        }
  
        // console.log(article)
        //Create a new Article using the `result` object built from scraping
        db.RSS.create(article)
          .then(function (dbRSS) {
            // View the added result in the console
            console.log(dbRSS);
          })
          .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
     
    });
  });
  // // Send a message to the client
  // res.json("Scraping");
  db.RSS.find({})
    .then(function (dbRSS) {
      // If we were able to successfully find jokes, send them back to the client
      res.json(dbRSS);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// // Route for getting all jokes from the db
// RSSController.get("/rss", function (req, res) {
//   // Grab every document in the jokes collection
//   
// });


module.exports = RSSController;