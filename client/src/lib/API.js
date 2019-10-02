import axios from 'axios';

export default {
  Users: {
    login: function (email, password) {
      return axios.post('/api/users/login', { email, password });
    },

    create: function (email, password) {
      return axios.post('/api/users', { email, password });
    },

    getMe: function (authToken) {
      return axios.get('/api/users/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
    }
  },

  Secrets: {
    getAll: function (authToken) {
      return axios.get('/api/secrets', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
    }
  },

  Scraper: {
    scrape: function(authToken,team) {
      console.log('scraping <====')
      return axios.get('/api/scrape/'+team, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
    },
    find: function(authToken){
      console.log('finding <====')
      return axios.get('/api/scrape/find',{
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
    }
  }
}
