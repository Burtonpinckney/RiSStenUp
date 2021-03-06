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

RSSController.get("/find", JWTVerifier, function (req, res) {
  console.log('starting find')
  db.RSS.find({})
  .then(function (dbRSS) {
    console.log(dbRSS)
    // If we were able to successfully find jokes, send them back to the client
    res.json(dbRSS);
  })
  .catch(function (err) {
    // If an error occurred, send it to the client
    res.json(err);
  });
})
// A GET route for scraping the echoJS website

RSSController.get("/:team", JWTVerifier, function (req, res) {
  const teamScrape = req.params.team
  console.log('<==========================================>', teamScrape)
  let teamSelection = ''
  let selectOn = ''
  let image = ''
  switch (teamScrape) {
    case 'Panthers':
      teamSelection = 'https://www.panthers.com/rss/news';
      selectOn = ".nfl-c-article__container"
      break;
    case 'Knights':
      teamSelection = 'https://www.milb.com/partnerxml/gen/news/rss/t494.xml';
      image = 'https://milb.bamcontent.com/documents/8/0/8/265807808/knights.svg'
      selectOn= '.article-item__bottom';
      break;
    case 'Hornets':
      teamSelection = 'https://www.nba.com/hornets/rss.xml';
      selectOn = '.field-type-text-with-summary'
      image = 'https://www.nba.com/hornets/sites/hornets/files/hornets_primary_logo.png?'
      break;
  }
  console.log(teamSelection)
  // teamSelected === 'panthers'? (teamP):(teamNC)
  //const teamSelection = req.body.team
  db.RSS.deleteMany({}, function (err, what) {
    console.log('cleared db', what)
    if (err) console.log(err)
  });
  Feed.load(teamSelection, function (err, rss) {
    //Confirms feed.load works but not database creation  
    // console.log(rss);
    rss.items.forEach(item => {

      //run cheerio on item.link to grab the article body, and assign it to a variable that we can pass to article.article_body

      var articleText;

      axios.get(item.link).then(function (results) {
        var $ = cheerio.load(results.data)

        $(selectOn).each(function (i, element) {
          articleText = $(element).text();
          // console.log(articleText)
        })
      }).then(function () {
        var article = {
          title: item.title,
          link: item.link,
          article_body: articleText, //cheerio scrape item.link for this
          team: teamSelection,
          
        }
        if(teamScrape === 'Panthers'){
          article.img_url = item.media.content[0].url[0]
        }
        else{
          article.img_url = image
        }
        // console.log(article)
        //Create a new Article using the `result` object built from scraping
        db.RSS.create(article)
          .then(function (dbRSS) {
            // View the added result in the console
            //res.status(dbRSS)
            
          })
          .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
          });
      })

    })
    res.json({'done':'yes'})
    
  });
  // // Send a message to the client
  

});

// // Route for getting all jokes from the db
// RSSController.get("/rss", function (req, res) {
//   // Grab every document in the jokes collection
//   
// });



module.exports = RSSController;