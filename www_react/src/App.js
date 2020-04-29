import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import HttpsRedirect from 'react-https-redirect';


import Corebook from './components/corebook.component';
import Create from './components/create.component';
import Index from './components/index.component';
import AddCampaign from './components/addcampaign.component';
import ListCampaign from './components/listcampaign.component';
import PlayerEdit from './components/playeredit.component';
import Invite from './components/invite.component';

import './App.css';

import {GoogleLogin, GoogleLogout} from 'react-google-login';
import Coda from 'coda-js';

const extrasList = [ "quirk", "flaws", "magicka", "weapon", "armor", "horse"];


class App extends Component {

  constructor(props) {
    super(props);
    this.compare = this.compare.bind(this);
    this.compareInverted = this.compareInverted.bind(this);
    this.loadCodaArrays = this.loadCodaArrays.bind(this);
    this.processExtras = this.processExtras.bind(this);
    this.processOneExtra = this.processOneExtra.bind(this);

    this.state = {
      user: {},
      player: {},
      sheets: [],
      campaigns: [],
      quirkArray: [],
      quirkSelectArray: [],
      flawsArray: [],
      flawsSelectArray: [],
      magickaArray: [],
      magickaSelectArray: [],
      weaponArray: [],
      weaponSelectArray: [],
      armorArray: [],
      armorSelectArray: [],
      horseArray: [],
      horseSelectArray: [],
      loadCodaArrays: true,
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
      screenWidth: null,
      googleError: "",
      isChrome: !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime),
      isFirefox: typeof InstallTrigger !== 'undefined'
     }
     this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    //      // Opera 8.0+
    // const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // // Firefox 1.0+
    // const isFirefox = typeof InstallTrigger !== 'undefined';

    // // Safari 3.0+ "[object HTMLElementConstructor]" 
    // const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

    // // Internet Explorer 6-11
    // const isIE = /*@cc_on!@*/false || !!document.documentMode;

    // // Edge 20+
    // const isEdge = !isIE && !!window.StyleMedia;

    // // Chrome 1 - 71
    // const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

    // // Blink engine detection
    // const isBlink = (isChrome || isOpera) && !!window.CSS;
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
    if (bandA > bandB) {comparison = 1;} 
    else if (bandA < bandB) {comparison = -1;}
    return comparison;
  }


  compareInverted(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.cost;
    const bandB = b.cost;

    let comparison = 0;
    if (bandA > bandB) {comparison = -1;} 
    else if (bandA < bandB) {comparison = 1;}
    return comparison;
  }

  processExtras(){
    var i=0;
    for(i=0;i<extrasList.length;i++){
      var extra = extrasList[i];
      if(this.state[extra+"Array"] && this.state[extra+"Array"].length == 0){
        // this.processOneExtra(extra);
      }
    }
    this.processOneExtra("quirk");

  }

  processOneExtra(extra){
    const scopedThis = this;
    import('./json/quirks')
      .then(JSON => {
        // module.loadPageInto(main);
        // JSON.sort(this.compare);
        const extraArray = JSON.default;
        extraArray.sort(this.compare);

        console.log(" >>> TEST >>> quirksJSON",JSON, extraArray);
        scopedThis.setState({ [extra+"Array"]: extraArray }, () => {
          var joinedSel = [];
          var arr = scopedThis.state[extra+"Array"];
          var i=0;
          for (i = 0; i < arr.length; i++) {
            var item = arr[i];
            var optionInner = item.name + " - (" + item.cost + ")";
            var optionString = {label: optionInner, value: i }
            joinedSel.push(optionString);
          }
          console.log(" >>> TEST >>> quirks arr",arr,joinedSel);

          scopedThis.setState({
              [extra+"SelectArray"]: joinedSel
            }, () => {
              console.log("this.state."+extra+"SelectArray",scopedThis.state[extra+"SelectArray"]);
          });  
        });
      })
      .catch(err => {
        console.log(" >>> FATAL >>> err loading: ",extra, err);
      });
    
  }

  loadCodaArrays(){
    if (this.state.quirkArray 
          && this.state.quirkArray.length == 0
          && this.state.loadCodaArrays
        ) {
      this.setState({
      loadCodaArrays: false
        }, () => {
          const coda = new Coda('d849acc0-66e6-4f17-8405-5e0a85cf7833'); // insert your token
          // const docID = "55_RuUt6nh";
          // const quirkTablelistRows = coda.listRows(docID, 'grid-sFVbFfjLoX');
          const flawsTablelistRows = coda.listRows('55_RuUt6nh', 'grid-G4ppHQClqI');
          const magickaTablelistRows = coda.listRows('55_RuUt6nh', 'grid-9SNgTm2b_x');
          const weaponTablelistRows = coda.listRows('55_RuUt6nh', 'grid-QZHWTOUszi');
          const horseTablelistRows = coda.listRows('55_RuUt6nh', 'grid-ksWXxCkr47');
          const armorTablelistRows = coda.listRows('55_RuUt6nh', 'grid-vc3JcNQDGu');
          // console.log("quirkTablelistRows:", quirkTablelistRows);

          // const sectionsList = coda.listSections('55_RuUt6nh');
          // console.log("sectionsList", sectionsList);
          
          // sectionsList.then(function(value) {
          //   console.log("sectionsList JSON", JSON.stringify(value));
          // });


          // const sectionAspects = coda.getSection('55_RuUt6nh', 'canvas-SnxtTqKQVw');
          // console.log("sectionAspects", sectionAspects);
          
          // sectionAspects.then(function(value) {
          //   console.log("sectionAspects JSON", JSON.stringify(value));
          // });


/*
          //  TEMP TO GET JSONS
          const tables = coda.listTables(docID);
          console.log(" >>> CODA TABLES", tables);
          
          tables.then(function(tbls) {
            var i;
            for (i = 0; i < tbls.length; i++) {
              const t_id = tbls[i].id;
              const name = tbls[i].name;
              console.log(" >>> CODA TABLES t_id:", t_id);
              const tablerow = coda.listRows(docID, t_id);
              tablerow.then(function(tblr) {
                console.log(" >>> CODA TABLES tblr:", name, tblr);
                const fileData = JSON.stringify(tblr);
                const blob = new Blob([fileData], {type: "text/plain"});
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = name+'.json';
                link.href = url;
                link.click();
              });
            }
          });
*/


          const scopedThis = this;

          


          flawsTablelistRows.then(function(value) {
            const flawsList = value;
            var i;
            var joined = [];
            // console.log("flawsList[0].values get c-*'s",flawsList[0].values, JSON.stringify(flawsList[0].values));
            for (i = 0; i < flawsList.length; i++) {
              var item = flawsList[i].values;
              var obj = {};
              obj.name = item["c-s9xzG7woXK"];
              obj.cost = item["c-rFFIm2sGh9"];
              obj.desc  = item["c-Lp7cyXFEDW"];
              obj.prereq  = item["c-zbVXoKQktq"];
              obj.benefit   = item["c-KocWBPt7SG"];
              obj.aspects  = item["c-LyCRQn9XSj"];
              obj.aptitudes  = item["c-dxrVGg7kLf"];

              joined.push(obj);

            }
            joined.sort(scopedThis.compareInverted);
            // console.log(" >>> TEST >>> flaws joined",joined);
            scopedThis.setState({ flawsArray: joined });
            // console.log("scopedThis.state.flawsArray",scopedThis.state.flawsArray);

            //  now to build the select friendly array
            var joinedSel = [];
            var arr = scopedThis.state.flawsArray;
            for (i = 0; i < arr.length; i++) {
              var item = arr[i];
              var optionInner = item.name + " - (" + item.cost + ")";
              // var optionString = "<option value=\""+optionInner+"\">"+optionInner+"</option>";
                // { label: "Snakes", value: 6 },
              var optionString = {label: optionInner, value: i }
              joinedSel.push(optionString);
              // console.log("inside props flawss array:", optionString);
            }
            scopedThis.setState({
                flawsSelectArray: joinedSel
              }, () => {
                console.log("this.state.flawsSelectArray",scopedThis.state.flawsSelectArray);
            });  
          });






          magickaTablelistRows.then(function(value) {
            const magickaList = value;
            var i;
            var joined = [];
            // console.log("magickaList[0].values get c-*'s",
            //       magickaList[0].values, 
            //       JSON.stringify(magickaList[0].values));

            for (i = 0; i < magickaList.length; i++) {
              var item = magickaList[i].values;
              var obj = {};
              obj.name = item["c-bsCHCx6q7b"];
              obj.cost = item["c-YStkFeoYgX"];
              obj.desc  = item["c-u_jw1APr1I"];
              obj.armor  = item["c-SS0-M0yvoI"];
              obj.penalty   = item["c-XDRsAOtXw9"];
              obj.damage  = item["c-gzvQuEUPue"];
              obj.ap  = item["c-9IAWNBUFF4"];

              joined.push(obj);
              
            }
            joined.sort(scopedThis.compare);
            // console.log("joined",joined);
            scopedThis.setState({ magickaArray: joined });
            // console.log("scopedThis.state.magickaArray",scopedThis.state.magickaArray);

            //  now to build the select friendly array
            var joinedSel = [];
            var arr = scopedThis.state.magickaArray;
            for (i = 0; i < arr.length; i++) {
              var item = arr[i];
              var optionInner = item.name + " - (" + item.cost + ")";
              // var optionString = "<option value=\""+optionInner+"\">"+optionInner+"</option>";
                // { label: "Snakes", value: 6 },
              var optionString = {label: optionInner, value: i }
              joinedSel.push(optionString);
              // console.log("inside props magickas array:", optionString);
            }
            scopedThis.setState({
                magickaSelectArray: joinedSel
              }, () => {
                console.log("this.state.magickaSelectArray",scopedThis.state.magickaSelectArray);
            });  
          });







          weaponTablelistRows.then(function(value) {
            const weaponList = value;
            var i;
            var joined = [];
            // console.log("weaponList[0].values get c-*'s",
            //       weaponList[0].values, 
            //       JSON.stringify(weaponList[0].values));

            for (i = 0; i < weaponList.length; i++) {
              var item = weaponList[i].values;
              var obj = {};
              obj.name = item["c-rd7vNFnaVQ"];
              obj.cost = item["c-yk8_qzh54S"];
              obj.damage  = item["c-0SJozHmPQm"];
              obj.ap  = item["c-vrIDidjHSN"];
              obj.range  = item["c-YRkro88oLT"];

              joined.push(obj);
              
            }
            joined.sort(scopedThis.compare);
            // console.log("joined",joined);
            scopedThis.setState({ weaponArray: joined });
            // console.log("scopedThis.state.weaponArray",scopedThis.state.weaponArray);

            //  now to build the select friendly array
            var joinedSel = [];
            var arr = scopedThis.state.weaponArray;
            for (i = 0; i < arr.length; i++) {
              var item = arr[i];
              var optionInner = item.name + " - (" + item.cost + ")";
              // var optionString = "<option value=\""+optionInner+"\">"+optionInner+"</option>";
                // { label: "Snakes", value: 6 },
              var optionString = {label: optionInner, value: i }
              joinedSel.push(optionString);
              // console.log("inside props weapons array:", optionString);
            }
            scopedThis.setState({
                weaponSelectArray: joinedSel
              }, () => {
                console.log("this.state.weaponSelectArray",scopedThis.state.weaponSelectArray);
            });  
          });







          armorTablelistRows.then(function(value) {
            const armorList = value;
            var i;
            var joined = [];
            // console.log("armorList[0].values get c-*'s",
            //       armorList[0].values, 
            //       JSON.stringify(armorList[0].values));

            for (i = 0; i < armorList.length; i++) {
              var item = armorList[i].values;
              var obj = {};
              obj.name = item["c-OqILalMUXQ"];
              obj.cost = item["c-Bdr6hk0g7E"];
              obj.armor  = item["c-Jhnu3dJcyy"];
              obj.penalty  = item["c-6MYC7AUcIX"];

              joined.push(obj);
              
            }
            joined.sort(scopedThis.compare);
            // console.log("joined",joined);
            scopedThis.setState({ armorArray: joined });
            // console.log("scopedThis.state.armorArray",scopedThis.state.armorArray);

            //  now to build the select friendly array
            var joinedSel = [];
            var arr = scopedThis.state.armorArray;
            for (i = 0; i < arr.length; i++) {
              var item = arr[i];
              var optionInner = item.name + " - (" + item.cost + ")";
              // var optionString = "<option value=\""+optionInner+"\">"+optionInner+"</option>";
                // { label: "Snakes", value: 6 },
              var optionString = {label: optionInner, value: i }
              joinedSel.push(optionString);
              // console.log("inside props armors array:", optionString);
            }
            scopedThis.setState({
                armorSelectArray: joinedSel
              }, () => {
                console.log("this.state.armorSelectArray",scopedThis.state.armorSelectArray);
            });  
          });







          horseTablelistRows.then(function(value) {
            const horseList = value;
            var i;
            var joined = [];
            // console.log("horseList[0].values get c-*'s",
            //       horseList[0].values, 
            //       JSON.stringify(horseList[0].values));

            for (i = 0; i < horseList.length; i++) {
              var item = horseList[i].values;
              var obj = {};
              obj.name = item["c-c49Q0Wukcu"];
              obj.cost = item["c-7iYqKoXArj"];
              obj.health  = item["c-91yx9u0q5B"];
              obj.armor  = item["c-JYSLOBbFPT"];
              obj.size  = item["c-VAVIBMwjdb"];
              obj.speed  = item["c--iK2sioLsM"];

              joined.push(obj);
              
            }
            joined.sort(scopedThis.compare);
            // console.log("joined",joined);
            scopedThis.setState({ horseArray: joined });
            // console.log("scopedThis.state.horseArray",scopedThis.state.horseArray);

            //  now to build the select friendly array
            var joinedSel = [];
            var arr = scopedThis.state.horseArray;
            for (i = 0; i < arr.length; i++) {
              var item = arr[i];
              var optionInner = item.name + " - (" + item.cost + ")";
              // var optionString = "<option value=\""+optionInner+"\">"+optionInner+"</option>";
                // { label: "Snakes", value: 6 },
              var optionString = {label: optionInner, value: i }
              joinedSel.push(optionString);
              // console.log("inside props horses array:", optionString);
            }
            scopedThis.setState({
                horseSelectArray: joinedSel
              }, () => {
                console.log("this.state.horseSelectArray",scopedThis.state.horseSelectArray);
            });  
          });





      });
      
    }
  }

  render() {
    console.log("broswer found:", this.state.isChrome, this.state.isFirefox);

    const responseGoogle = (response) => {
      console.log("response",response);
      // this.user = auth2.currentUser.get().getBasicProfile();

      if(response){
        const user = response.getBasicProfile();
        const email = user.getEmail();

        axios.defaults.baseURL = '';
        axios.get('/player/'+ encodeURI(email) ,{ baseUrl: "" })
          .then(response => {
            this.setState({
                user: user,
                name: user.getGivenName(),
                owner: email,
                loadState: true,
                player: response.data[0] 
              }, () => {
                console.log("response, user, and player state set",
                    this.state.owner,
                    this.state.player);
            }); 
          })
          .catch(function (error) {
            console.log(error);
          })

        // this.freshGummi(this.state.user.getEmail(), this.state.gummi);
        this.loadCodaArrays();
        this.processExtras();
      }
    }

    const responseError = (response) => {
      console.log("responseError",response);
      // this.user = auth2.currentUser.get().getBasicProfile();
      this.setState({googleError: response.error});
      
    }

    const responseLogout = (response) => {
      console.log("responseError",response);
      alert('You have been logged out!');


      window.location.reload();
      
    }


    return (
      <HttpsRedirect>
      <Router>

        <p>This is the online character sheet for Dyr-Valnya, which can be found on  
          <a href="https://coda.io/d/dyr-valnya_d55_RuUt6nh">  coda.io</a>
        </p>

        <div style={this.state.googleError ? {} : {display: 'none'}}>
          <h3>Google has experienced the following error:</h3>
          <h3 className="warning">{ this.state.googleError }</h3>
        </div>

        <div style={this.state.loadState ? { display: 'none' } : {}}>
          <div>
            <h3>Please sign into Google to continue.</h3>
          </div>
          <GoogleLogin
            clientId="662678115576-2aot69uthdfcqs6m7k6n9dr5v03glb09.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
            // clientId="662678115576-0o3gbqcmlu0fejmn3dkfte0g9evoqe5l.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
            buttonText="LOGIN WITH GOOGLE"
            onSuccess={responseGoogle}
            onFailure={responseError}
            onRequest={responseGoogle}
            isSignedIn="true"
          />
          
        </div>
        <div className="container" style={this.state.loadState && this.state.quirkArray.length > 0 ? {} : { display: 'none' }}>
          <div className="browserWarning" style={ !this.state.isChrome && !this.state.isFirefox ? {} : { display: 'none' }}>
            <h3 >This browser is not fully supported</h3>
            <p>Site designed for      
              <a href="https://www.google.com/chrome/">   Google Chrome</a>. 
            </p>
          </div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/playeredit/'+this.state.player._id} className="navbar-brand"> Hey, {this.state.name}  </Link>
            <div className=" navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/addcampaign'} className="nav-link">New Campaign</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/listcampaign'} className="nav-link">My Campaigns</Link>
                </li>
                { this.state.player &&
                <li className="nav-item">
                  <Link to={'/playeredit/'+this.state.player._id} className="nav-link">My Profile</Link>
                </li>
                }
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">New Character</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/index'} className="nav-link">My Characters</Link>
                </li>
                <li className="nav-item">
                  <GoogleLogout
                    clientId="662678115576-2aot69uthdfcqs6m7k6n9dr5v03glb09.apps.googleusercontent.com"
                    render={renderProps => (
                      <Link to={'/'} className="nav-link" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        Logout
                      </Link>
                    )}
                    buttonText="Logout"
                    onLogoutSuccess={responseLogout}
                  >
                  </GoogleLogout>
                </li>
              </ul>
            </div>
          </nav>
            <Switch>
              <Route 
                exact path='/' 
                render={(props) => 
                    <Corebook {...props} 
                      user={this.state.user} 
                      player={this.state.player}  
                    />}
              />
              <Route
                exact path='/create'
                render={(props) => 
                    <Create {...props} 
                      user={this.state.user} 
                      player={this.state.player} 
                      quirkArray={this.state.quirkArray} 
                      quirkSelectArray={this.state.quirkSelectArray} 
                      flawsArray={this.state.flawsArray} 
                      flawsSelectArray={this.state.flawsSelectArray} 
                      magickaArray={this.state.magickaArray} 
                      magickaSelectArray={this.state.magickaSelectArray} 
                      weaponArray={this.state.weaponArray} 
                      weaponSelectArray={this.state.weaponSelectArray} 
                      armorArray={this.state.armorArray} 
                      armorSelectArray={this.state.armorSelectArray} 
                      horseArray={this.state.horseArray} 
                      horseSelectArray={this.state.horseSelectArray} 
                    />}
              />

              <Route
                exact path='/addcampaign'
                render={(props) => 
                    <AddCampaign {...props} 
                      user={this.state.user} 
                      player={this.state.player} 
                    />}
              />
              <Route
                exact path='/editcampaign/:id'
                render={(props) => 
                    <AddCampaign {...props} 
                      user={this.state.user} 
                      player={this.state.player} 
                    />}
              />
              <Route
                exact path='/playeredit/:id'
                render={(props) => 
                    <PlayerEdit {...props} 
                      user={this.state.user} 
                      player={this.state.player} 
                    />}
              />

              <Route
                exact path='/edit/:id'
                render={(props) => 
                    <Create {...props} 
                      user={this.state.user} 
                      player={this.state.player} 
                      quirkArray={this.state.quirkArray} 
                      quirkSelectArray={this.state.quirkSelectArray} 
                      flawsArray={this.state.flawsArray} 
                      flawsSelectArray={this.state.flawsSelectArray} 
                      magickaArray={this.state.magickaArray} 
                      magickaSelectArray={this.state.magickaSelectArray} 
                      weaponArray={this.state.weaponArray} 
                      weaponSelectArray={this.state.weaponSelectArray} 
                      armorArray={this.state.armorArray} 
                      armorSelectArray={this.state.armorSelectArray} 
                      horseArray={this.state.horseArray} 
                      horseSelectArray={this.state.horseSelectArray} 
                    />}
              />
              <Route 
                exact path='/index' 
                render={(props) => 
                    <Index {...props} 
                      user={this.state.user} 
                      player={this.state.player}  
                    />}
              />
              <Route 
                exact path='/listcampaign' 
                render={(props) => 
                    <ListCampaign {...props} 
                      user={this.state.user} 
                      player={this.state.player}  
                    />}
              />
              <Route 
                exact path='/invite/:id' 
                render={(props) => 
                    <Invite {...props} 
                      user={this.state.user} 
                      player={this.state.player}  
                    />}
              />
            </Switch>
            
        </div>
      </Router>        
      </HttpsRedirect>

    );
  }
}

export default App;

//isSignedIn="true"
