import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';

import './App.css';

import GoogleLogin from 'react-google-login';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      name: "",
      owner: "",
      loadState: false,
      sessionLength: 10,
      restLength: 5,
      session: 10,
      rest: 5,
      isTicking: true,
      isSession: true,
      timeSwitch: false,
      screenWidth: null
     }
     this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions());
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.updateWindowDimensions)
  }

  updateWindowDimensions() {
     this.setState({ screenWidth: window.innerWidth });
  }



  render() {
    const responseGoogle = (response) => {
      console.log("response",response);
      // this.user = auth2.currentUser.get().getBasicProfile();

      if(response){
        this.setState({user: response.getBasicProfile()});
        console.log("responseGoogle  this.state.user",
                    this.state.user, 
                    this.state.user.getEmail(),
                    this.state.user.getGivenName());
        this.setState({name: this.state.user.getGivenName()});
        this.setState({owner: this.state.user.getEmail()});
        this.setState({loadState: true});

        // this.freshGummi(this.state.user.getEmail(), this.state.gummi);
      }
    }

    return (
      <Router>
        <div style={this.state.loadState ? { display: 'none' } : {}}>
          <GoogleLogin
            clientId="662678115576-2aot69uthdfcqs6m7k6n9dr5v03glb09.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
            // clientId="662678115576-0o3gbqcmlu0fejmn3dkfte0g9evoqe5l.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
            buttonText="LOGIN WITH GOOGLE"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            onRequest={responseGoogle}
            isSignedIn="true"
          />
        </div>
        <div className="container" style={this.state.loadState ? {} : { display: 'none' }}>
          <div> Hey, {this.state.name} </div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">Dyr Valnya Character Sheet App</Link>
            <div className=" navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Create</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/index'} className="nav-link">Index</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
              <Route
                exact path='/create'
                render={(props) => <Create {...props} user={this.state.user} />}
              />
              <Route
                exact path='/edit/:id'
                render={(props) => <Edit {...props} user={this.state.user} />}
              />
              <Route path='/index' component={ Index } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
