import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import HttpsRedirect from 'react-https-redirect';


import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';

import './App.css';

import GoogleLogin from 'react-google-login';
import Coda from 'coda-js';


class App extends Component {

  constructor(props) {
    super(props);
    this.compare = this.compare.bind(this);
    this.loadQuirkArray = this.loadQuirkArray.bind(this);

    this.state = {
      user: {},
      quirkArray: [],
      quirkSelectArray: [],
      loadQuirkArray: true,
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

  compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.cost;
    const bandB = b.cost;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

  loadQuirkArray(){
    if (this.state.quirkArray 
          && this.state.quirkArray.length == 0
          && this.state.loadQuirkArray
        ) {
      this.setState({
      loadQuirkArray: false
        }, () => {
          const coda = new Coda('d849acc0-66e6-4f17-8405-5e0a85cf7833'); // insert your token
          const quirkTablelistRows = coda.listRows('55_RuUt6nh', 'grid-sFVbFfjLoX');
          // console.log("quirkTablelistRows:", quirkTablelistRows);

          // const sectionsList = coda.listSections('55_RuUt6nh');
          // console.log("sectionsList", sectionsList);
          
          // sectionsList.then(function(value) {
          //   console.log("sectionsList JSON", JSON.stringify(value));
          // });


          const sectionAspects = coda.getSection('55_RuUt6nh', 'canvas-SnxtTqKQVw');
          console.log("sectionAspects", sectionAspects);
          
          sectionAspects.then(function(value) {
            console.log("sectionAspects JSON", JSON.stringify(value));
          });

          




          const scopedThis = this;

          quirkTablelistRows.then(function(value) {
            const quirkList = value;
            var i;
            var joined = [];
            for (i = 0; i < quirkList.length; i++) {
              var item = quirkList[i].values;
              var obj = {};
              obj.name = item["c-DwoFJQd3dl"];
              obj.cost = item["c-y_V5aAOe6T"];
              obj.desc  = item["c-lNP3U8OyOI"];
              obj.prereq  = item["c--ZouJOAvPm"];
              obj.benefit   = item["c-l4Bk_6P6LS"];
              obj.aspects  = item["c-vFII4sqtOl"];
              obj.aptitudes  = item["c-4QuheStMsP"];

              joined.push(obj);
              
            }
            joined.sort(scopedThis.compare);
            // console.log("joined",joined);
            scopedThis.setState({ quirkArray: joined });
            // console.log("scopedThis.state.quirkArray",scopedThis.state.quirkArray);

            //  now to build the select friendly array


            var joinedSel = [];
            var arr = scopedThis.state.quirkArray;
            for (i = 0; i < arr.length; i++) {
              var item = arr[i];
              var optionInner = item.name + " - (" + item.cost + ")";
              // var optionString = "<option value=\""+optionInner+"\">"+optionInner+"</option>";
                // { label: "Snakes", value: 6 },
              var optionString = {label: optionInner, value: i }
              joinedSel.push(optionString);
              // console.log("inside props quirks array:", optionString);
              
            }
            scopedThis.setState({
                quirkSelectArray: joinedSel
              }, () => {
                // console.log("this.props.quirkArray",this.props.quirkArray);
                console.log("this.state.quirkSelectArray",scopedThis.state.quirkSelectArray);
            });  
          });
      });
      
    }
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
        this.loadQuirkArray();
      }
    }

    return (
      <HttpsRedirect>
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
        <div className="container" style={this.state.loadState && this.state.quirkArray.length > 0 ? {} : { display: 'none' }}>
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
                render={(props) => 
                    <Create {...props} 
                      user={this.state.user} 
                      quirkArray={this.state.quirkArray} 
                      quirkSelectArray={this.state.quirkSelectArray} 
                    />}
              />

              <Route
                exact path='/edit/:id'
                render={(props) => 
                    <Create {...props} 
                      user={this.state.user} 
                      quirkArray={this.state.quirkArray} 
                      quirkSelectArray={this.state.quirkSelectArray} 
                    />}
              />
              <Route path='/index' component={ Index } />
            </Switch>
        </div>
      </Router>        
      </HttpsRedirect>

    );
  }
}

export default App;
