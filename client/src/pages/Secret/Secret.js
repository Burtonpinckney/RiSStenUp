import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
// import Image from './Image/PantherStadium.jpg'
import Feed from '../../components/Feed/Feed';
import Sidebar from '../../components/Sidebar/sidebar';
import Content from '../../components/Content/content';
// import Button from 'react-bootstrap/Button';
// import { Button } from 'react-native-elements';
import Button from '@material-ui/core/Button';
import API from '../../lib/API';
import AuthContext from '../../contexts/AuthContext';
import './Secret.css';

//feed component imports
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import './feed.css';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
//   inline: {
//     display: 'inline',
//   },
// }));
var speaking = ''
class Secret extends Component {
  static contextType = AuthContext;

  state = {
    isLoading: true,
    error: "",
    articles: [],
    activeArticle: {}
  }

  componentDidMount() {
    this.scrape('Panthers')
  }
  scrape = (team) => {
    this.setState({team})
    API.Scraper.scrape(this.context.authToken, team).then(
      (response) => {
        console.log(response.data)
     
       const getArticles = () => {
          console.log('getting articles')

          API.Scraper.find(this.context.authToken).then(articles => {
            console.log(articles, 'articles')
             this.setState({ articles: articles.data })


          })}
          setTimeout(() => {
            getArticles()
          }, 2000);
        })
            .catch(err => {
              return this.setState({ error: "broken, please fix" });
              console.log(err);
            })
          .finally(() => this.setState({ isLoading: false }));
        }
        selectArticle = (id) => {

          for (var i = 0; i < this.state.articles.length; i++) {
            if (id === this.state.articles[i]._id) {
              this.setState({
                activeArticle: this.state.articles[i]
              })
              console.log("state has been set to the selected article")
            }
          }
        }
        setTeam = (team) => {
          console.log(team)
          this.scrape(team)
        }
        speak = (test) => {
          if (test === 'play') {
            this.speaker = new SpeechSynthesisUtterance();
            this.speaker.lang = 'en-US';
            this.speaker.text = this.state.activeArticle.article_body;
            window.speechSynthesis.speak(this.speaker)
            console.log('clicking it')
          }
          else if (test) {
            window.speechSynthesis.stop(this.speaker)
          }
          else {
            window.speechSynthesis.resume(this.speaker)
          }

        }
        pause = () => {          console.log('no')

        }


        render() {
          // const classes = useStyles();
          return (
            <div className='Secret'>

              <div className='row content'>

                <div className='col-sm-2'>
                  <Sidebar setTeam={this.setTeam} />
                </div>
                <div className='col-sm-4'>
                  <div className="feed">
                    <h1>{this.state.team}</h1>
                    <hr/>
                    <List className="{classes.root}">
                      {this.state.articles ? (
                        this.state.articles.slice(0, 5).map((articles) => {
                          return (
                            <ListItem alignItems="flex-start" data-id={articles._id} key={articles._id} onClick={() => this.selectArticle(articles._id)}>
                              <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={articles.img_url} />
                              </ListItemAvatar>
                              <ListItemText
                                primary={articles.title}
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      className="{classes.inline}"
                                      color="textPrimary"
                                    >

                                    </Typography>

                                  </React.Fragment>
                                }
                              />
                            </ListItem>

                          )
                        })
                      ) : (null)}
                      <Divider variant="inset" component="li" />
                    </List>
                  </div>


                </div>
                <div className='col-sm-6'>
                  <div className="contentBox">
                    <p className="trouble" onClick={
                      () => { this.speak('play') }
                    }>
                      {this.state.activeArticle.article_body}
                    </p>
                  </div>
                  <div classname="infoBox">
                    <p>Click article text for audio</p>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }

export default Secret;
