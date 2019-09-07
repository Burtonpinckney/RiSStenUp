import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
// import Image from './Image/PantherStadium.jpg'
import Feed from '../../components/Feed/Feed';
import Sidebar from '../../components/Sidebar/sidebar';
import Content from '../../components/Content/content';
// import Button from 'react-bootstrap/Button';
import API from '../../lib/API';
import AuthContext from '../../contexts/AuthContext';
import './Secret.css'
class Secret extends Component {
  static contextType = AuthContext;

  state = {
    isLoading: true,
    error: ""
  }

  componentDidMount() {
    API.Secrets.getAll(this.context.authToken)
      .then(response => response.data)
      .then(secrets => this.setState({ secrets }))
      .catch(err => {
        if (err.response.status === 401) {
          return this.setState({ error: "Unauthorized. Please login." });
        }

        console.log(err);
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    return (
      <div className='Secret'>
        {/* <img src={Image} className="img"/> */}
        <div className='row'>
          {/* <div className='col'>
            {this.state.isLoading
              ? <div className='alert alert-success'>Loading...</div>
              : this.state.error
                ? <div className='alert alert-danger'>{this.state.error}</div>
                : <div>
                  <p>Shh, the secret is...</p>
                  <p><em>{this.state.secrets[0].message}</em></p>
                </div>}
          </div> */}
          <div className='col-sm-2'>
            <Sidebar/>
          </div>
          <div className='col-sm-4'>
            <Feed/>
          </div>
          <div className='col-sm-6'>
            <Content/>
            {/* <Button variant="warning">Warning</Button>
            <Button variant="warning">Warning</Button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Secret;
