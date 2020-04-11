import React, { Component } from 'react';
import axios from 'axios';
import md5 from 'crypto-js/md5';

import Select from 'react-select';


const makeID = () => {
  // var hash = md5(new Date().valueOf() + Math.random()).toString();
  var date = new Date().valueOf();
  var rnd = Math.random();
  var hash = md5((date + rnd).toString());
  var hashStr = hash.toString();
  console.log("md5 hash:", hash, hashStr, rnd, date);
  return hashStr.substr(-7);
}


const initialState = {
  id: makeID(),
  name: '',
  desc: '',
  players: [],
  gms: [],
  sheets: []
};


export default class AddCampaign extends Component {
  constructor(props) {
    super(props);


    
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);

    this.checkIfComponent = this.checkIfComponent.bind(this);
    this.checkComponent = this.checkComponent.bind(this);
    this.undoClearAndRefresh = this.undoClearAndRefresh.bind(this);
    this.clearState = this.clearState.bind(this);
    this.onRefreshFromDB = this.onRefreshFromDB.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.displayPlayers = this.displayPlayers.bind(this);
    this.displayOnePlayer = this.displayOnePlayer.bind(this);

    this.state = initialState;
    Object.assign(this.state, {
      whichComponent: ''
    });

  }

  



  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeDesc(e) {
    this.setState({
      desc: e.target.value
    });
  }


  onSubmit(e) {
    e.preventDefault();

    var obj = {
      id: this.state.id,
      name: this.state.name,
      desc: this.state.desc,
      players: this.state.players,
      gms: this.state.gms,
      sheets: this.state.sheets
    };

    var editID = this.props.match.params.id;
    axios.defaults.baseURL = '';
    if(editID && editID.length){
      console.log("In Edit, editID:",editID);
      axios.post('/campaign/update/'+this.props.match.params.id, obj, { baseUrl: "" })
          .then(res => console.log(res.data));
    }else{
      console.log("In Create, no editID found", editID);
      // gonna fill the array cuz create
      var array = [];
      array.push(this.props.player.email);
      obj.players = array;
      axios.post('/campaign/add', obj, { baseUrl: "" })
            .then(res => console.log(res.data));
    }
    
    this.props.history.push('/listcampaign');  // either way, bounce to ....
    
  }

  checkIfComponent(tmp = ""){
    var editID = this.props.match.params.id;
    var cmp = "";
    if(editID && editID.length){
      cmp = "Edit";
    }else{
      cmp = "Create"
    }

    if(tmp && tmp.length > 0){
      if(tmp.includes(cmp)){
        return true;
      }else{
        return false;
      }
    }else{
      return cmp;
    }
    
  }

  checkComponent(){
    var cmp = this.checkIfComponent();
    if(!this.state.whichComponent.includes(cmp)){
      console.log("Not matching components, will update state", this.state.whichComponent,cmp);
      this.setState({
        whichComponent: cmp
      }, () => {
        if(cmp.includes("Create")){this.clearState();}
      });
    }
    return cmp;
  }


  componentDidMount() {
    // this.clearState();
    this.checkComponent();
    

    var coll = document.getElementsByClassName("collapsible");
    var active = document.getElementsByClassName("active");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          console.log("content: ",content);
          content.style.maxHeight = content.scrollHeight + "px";
        } 
      });
    }
    for(i = 0; i < active.length; i++){
      var content = active[i].nextElementSibling;
      console.log("content: ",content);
      content.style.maxHeight = content.scrollHeight + "px";
    }


    var editID = this.props.match.params.id;
    if(editID && editID.length){
      console.log("In Edit (componentDidMount), editID:",editID);
      this.onRefreshFromDB(editID);
    }else{
      console.log("In Create (componentDidMount), no editID found", editID);
    }

    // console.log("check if quirkSelectArray made it",this.props.quirkSelectArray);
  }

  undoClearAndRefresh(){
    this.setState(initialState, () => {
      this.onRefreshFromDB();
    });
  }

  onRefreshFromDB(){
    const scopedThis = this;
    axios.defaults.baseURL = '';
    axios.get('/campaign/edit/'+this.props.match.params.id, { baseUrl: "" })
      .then(response => {
        console.log("onRefreshFromDB, response.data:", response.data, this.props.match.params.id);
        this.setState(response.data, () => {
          console.log("this.state loaded from DB!", this.state);
        });

      })
      .catch(function (error) {
          console.log(error);
      });
    
  }


  clearState(){
    this.setState(initialState, () => {
      this.setState({
        id: this.makeID()
      }, () => {
        console.log("this.state cleared!", this.state, "new ID:", this.state.id);
      });
    });
  }








// mainStat(stat, isAspect=false) {
//     // console.log("mainStat:", stat, isAspect);
//     var title = stat.charAt(0).toUpperCase() + stat.substring(1);
//     var val = this.state[stat].toString() ;
//     return (
//       <div className="form-group" key={title}>
//           <label>{title}: {val}</label>
//           <input type="range" 
//             className="form-control"
//             value={val}
//             min="0" max="5" step="1"
//             onChange={(e) => this.onChangeAspectAndAptitude(stat, e, isAspect)}
//             />
//       </div>
//     );
//   }

// displayStatArray(typeArray, isAspect=false){
//     // console.log("displayStatArray:",typeArray, isAspect);
//     var scopedThis = this;
//     var statComponents = typeArray.map(function(stat) {
//       return   scopedThis.mainStat(stat, isAspect) ;
//     });
//     return <div>{statComponents}</div>;
//   }

//   { this.displayStatArray(mentalAspects, true) }
  displayOnePlayer(player){
    var email = player.email;
    return (
      <li className="form-group" key={email}>
        <ul>
          <li>{player.email}</li>
          <li>{player.discordname}</li>
          <li>{player.xp}</li>
          <li>{player}</li>
        </ul>
      </li>
    );
  }

  displayPlayers(){
    var scopedThis = this;
    var showPlayers = this.state.players.map(function(player) {
      return  scopedThis.displayOnePlayer(player) ;
    });
    return <ul>{showPlayers}</ul>;
  }




 
  render() {



    return (

        <div style={{ marginTop: 10 }}>
            <h3 align="center">
              { this.props.match.params.id 
                  ? "Update Campaign" 
                  : "Add New Campaign"}
            </h3>
           


            
            <form onSubmit={this.onSubmit}>

              

            <h2>Campaign Desc</h2>
            <p> Text descibing the page. </p>

            <div className="form-group">
              <label>Name:  </label>
              <input 
                type="text" 
                className="form-control" 
                value={this.state.name}
                onChange={this.onChangeName}
                />
            </div>
            <div className="form-group">
              <label>Description:  </label>
              <input 
                type="text" 
                className="form-control" 
                value={this.state.desc}
                onChange={this.onChangeDesc}
                />
            </div>

            { this.displayPlayers() }


            <div className="form-group">
              <input type="submit" 
                style={{float: 'right'}}
                value={ this.props.match.params.id 
                  ? "Update Campaign" 
                  : "Save Campaign"}
                className="btn btn-primary"/>
            </div>
                    

                
            </form>
        </div>
    )
  }
}