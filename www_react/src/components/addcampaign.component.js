import React, { Component } from 'react';
import axios from 'axios';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';

import Select from 'react-select';





const initialState = {
  id: '',
  name: '',
  desc: '',
  player: '',
  players: [],
  gms: [],
  sheets: [],
  playerObjs: [],
  gmObjs: [],
  sheetObjs: [],
  selectOptionsSheets: [],
  selectOptionsSheetObjs: [],
  addSheet: '',
  newplayeremail: "",
  newgmemail: "",
  isGM: false,
  isPlayer: false,
  xptoplayer: 0,
  xptoplayertemail: '',
  xptosheet: 0,
  xptosheetid: ''
};


export default class AddCampaign extends Component {
  constructor(props) {
    super(props);


    
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.onChangeNewPlayerEmail = this.onChangeNewPlayerEmail.bind(this);
    this.onChangeNewGMEmail = this.onChangeNewGMEmail.bind(this);

    this.checkIfComponent = this.checkIfComponent.bind(this);
    this.checkComponent = this.checkComponent.bind(this);
    this.undoClearAndRefresh = this.undoClearAndRefresh.bind(this);
    this.clearState = this.clearState.bind(this);
    this.onRefreshFromDB = this.onRefreshFromDB.bind(this);
    this.loadForSubmit = this.loadForSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitNewPlayerEmail = this.onSubmitNewPlayerEmail.bind(this);
    this.onSubmitNewGMEmail = this.onSubmitNewGMEmail.bind(this);
    this.displayPlayers = this.displayPlayers.bind(this);
    this.displayOnePlayer = this.displayOnePlayer.bind(this);

    this.loadSelectArraySheets = this.loadSelectArraySheets.bind(this);
    this.onChangeAddSheet = this.onChangeAddSheet.bind(this);
    this.onSubmitAddSheet = this.onSubmitAddSheet.bind(this);
    this.onSubmitDeleteSheet = this.onSubmitDeleteSheet.bind(this);

    this.onChangeXPtoPlayer = this.onChangeXPtoPlayer.bind(this);
    this.onSubmitXPtoPlayer = this.onSubmitXPtoPlayer.bind(this);

    this.onChangeXPtoSheet = this.onChangeXPtoSheet.bind(this);
    this.onSubmitXPtoSheet = this.onSubmitXPtoSheet.bind(this);

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
  onChangeNewPlayerEmail(e) {
    this.setState({
      newplayeremail: e.target.value
    });
  }
  onChangeNewGMEmail(e) {
    this.setState({
      newgmemail: e.target.value
    });
  }
  onChangeXPtoPlayer(e) {
    this.setState({
      xptoplayer: e.target.value,
      xptoplayertemail: e.target.name
    });
  }
  onChangeXPtoSheet(e) {
    this.setState({
      xptosheet: e.target.value,
      xptosheetid: e.target.name
    });
  }
  onChangeDesc(e) {
    this.setState({
      desc: e.target.value
    });
  }
  onChangeAddSheet(e) {
    console.log("onChangeAddSheet:", e);
    this.setState({ addSheet: e.value });
  }


  loadForSubmit(){
    return {
      id: this.state.id,
      name: this.state.name,
      desc: this.state.desc,
      players: this.state.players,
      gms: this.state.gms,
      sheets: this.state.sheets
    };
  }

  onSubmit(e) {
    e.preventDefault();

    var obj = this.loadForSubmit();

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
      obj.gms = array;
      axios.post('/campaign/add', obj, { baseUrl: "" })
            .then(res => console.log(res.data));
    }
    
    this.props.history.push('/listcampaign');  // either way, bounce to ....
    
  }

  onSubmitNewPlayerEmail(e) {
    e.preventDefault();


    var players = this.state.players;
    players.push(this.state.newplayeremail);
    console.log(" Before setState onSubmitNewPlayerEmail: ", this.state, players);
    this.setState({
      players: players,
      newplayeremail: ""
    }, () => {
      console.log("setState onSubmitNewPlayerEmail: ", this.state, players);
      var obj = this.loadForSubmit();
      var editID = this.props.match.params.id;
      axios.defaults.baseURL = '';
      if(editID && editID.length){
        console.log("In Edit, editID:",editID);
        axios.post('/campaign/update/'+this.props.match.params.id, obj, { baseUrl: "" })
            .then(res => {
              console.log(res.data);
              this.undoClearAndRefresh();
            });
      }else{
        console.log("In Create, no editID found, do nothing", editID);
      }
    });
  }

  onSubmitNewGMEmail(e) {
    e.preventDefault();


    var gms = this.state.gms;
    gms.push(this.state.newgmemail);
    console.log(" Before setState onSubmitNewGMEmail: ", this.state, gms);
    this.setState({
      gms: gms,
      newplayeremail: ""
    }, () => {
      console.log("setState onSubmitNewGMEmail: ", this.state, gms);
      var obj = this.loadForSubmit();
      var editID = this.props.match.params.id;
      axios.defaults.baseURL = '';
      if(editID && editID.length){
        console.log("In Edit, editID:",editID);
        axios.post('/campaign/update/'+this.props.match.params.id, obj, { baseUrl: "" })
            .then(res => {
              console.log(res.data);
              this.undoClearAndRefresh();
            });
      }else{
        console.log("In Create, no editID found, do nothing", editID);
      }
    });
  }

  onSubmitAddSheet(e) {
    e.preventDefault();

    const id = this.state.addSheet;
    if(!id){return 1;}

    var sheetArray = this.state.sheets;
    sheetArray.push(id);

    var obj = this.loadForSubmit();
    obj.sheets = sheetArray;

    axios.defaults.baseURL = '';
    axios.post('/campaign/update/'+this.props.match.params.id, obj, { baseUrl: "" })
        .then(res => {
          console.log("onSubmitAddSheet ",res.data);
          this.undoClearAndRefresh();
        });

  }



  onSubmitDeleteSheet(id) {
    return e => {
      e.preventDefault()
      console.log("onSubmitDeleteSheet id:", id, e);
      var sheetArray = this.state.sheets;
      var sheetArray = this.state.sheets.filter(function(value, index, arr){ 
        return !value.includes(id);
      });


      var obj = this.loadForSubmit();
      obj.sheets = sheetArray;

      axios.defaults.baseURL = '';
      axios.post('/campaign/update/'+this.props.match.params.id, obj, { baseUrl: "" })
          .then(res => {
            console.log("onSubmitDeleteSheet ",res.data);
            this.undoClearAndRefresh();
          });
    }
  }



  onSubmitDeletePlayer(player) {
    return e => {
      e.preventDefault()
      console.log("onSubmitDeletePlayer player:", player, e);
      var array = this.state.players.filter(function(value, index, arr){ 
        return !value.includes(player);
      });


      var obj = this.loadForSubmit();
      obj.players = array;

      axios.defaults.baseURL = '';
      axios.post('/campaign/update/'+this.props.match.params.id, obj, { baseUrl: "" })
          .then(res => {
            console.log("onSubmitDeletePlayer ",res.data);
            this.undoClearAndRefresh();
          });
    }
  }


  onSubmitXPtoPlayer(e) {
    e.preventDefault();

    var obj = {
      gm: this.props.player.email,
      target: this.state.xptoplayertemail,
      qty: this.state.xptoplayer
    };

    
    var editID = this.props.match.params.id;
    axios.defaults.baseURL = '';
    if(editID && editID.length){
      console.log("In Edit, editID:",editID);
      axios.post('/campaign/xp/', obj, { baseUrl: "" })
          .then(res => {
            console.log(res.data);
            this.undoClearAndRefresh();
          });
    }else{
      console.log("In Create, no editID found, do nothing", editID);
    }

  }



  onSubmitXPtoSheet(e) {
    e.preventDefault();

    var obj = {
      gm: this.state.id,
      target: this.state.xptosheetid,
      qty: this.state.xptosheet
    };

    
    var editID = this.props.match.params.id;
    axios.defaults.baseURL = '';
    if(editID && editID.length){
      console.log("In Edit, editID:",editID);
      axios.post('/campaign/xp/', obj, { baseUrl: "" })
          .then(res => {
            console.log(res.data);
            this.undoClearAndRefresh();
          });
    }else{
      console.log("In Create, no editID found, do nothing", editID);
    }

  }


  loadSelectArraySheets(selectObjs=this.state.selectOptionsSheetObjs){
    console.log("loadSelectArraySheets selectObjs:", selectObjs);

    var newArray = [];
    selectObjs.forEach(obj => {
      if(this.state.sheets.includes(obj.id)){return;} // skip what we have

      var id = obj.id;
      var name = obj.name;
      var owner = obj.owner;
      var xp = obj.available_xp;
      var label = name + " (" + owner + ")" + " XP: " + xp
      var obj = {  label: label,
                   value: id
                }
      newArray.push(obj);
    });
    console.log("loadSelectArraySheets newArray:", newArray);
    return newArray;
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
  componentDidUpdate(prevProps, prevState) {

    // console.log("state n prop", this.state.player, this.props.player);
    if(!this.state.player.email){
      if(this.props.player.email){
        this.setState({
          player: this.props.player
        }, () => {
          // console.log("found if GM:", this.state.isGM, email);
        });  
      }
    }

    if(!this.state.isGM && !this.state.isPlayer){
      // console.log("not player state", this.state.player);
      if(this.state.gms && this.state.gms.length > 0 && this.props.player.email){
        // console.log("player prop exists", this.props.player);
        const email = this.props.player.email;
        if(this.state.gms.includes(email)){
          console.log("found your email as GM");
          this.setState({ isGM: true });
        }else{
          console.log("found your email as Player");
          this.setState({ isPlayer: true });
        }  
      }
    }
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
        const res = response.data;
        const campaign = res.campaign;
        
        this.setState({
          id: campaign.id,
          name: campaign.name,
          desc: campaign.desc,
          players: campaign.players,
          gms: campaign.gms,
          sheets: campaign.sheets,
          playerObjs: res.playerObjs,
          gmObjs: res.gmObjs,
          sheetObjs: res.sheetObjs
        }, () => {
          console.log("ths.state loaded from DB!", this.state);
          axios.defaults.baseURL = '';
          axios.post('/sheet/getsheets', this.state.players, { baseUrl: "" })
            .then(res => {
              console.log(res.data);
              this.setState({
                selectOptionsSheetObjs: res.data
              }, () => {
                console.log("selectOptionsSheetObjs loaded from DB!", this.state.selectOptionsSheetObjs, res.data);
                
              });
            });
        });

      })
      .catch(function (error) {
          console.log(error);
      });
    
  }


  clearState(){
    this.setState(initialState, () => {
      console.log("this.state cleared!", this.state, "new ID:", this.state.id);
    });
  }



  displayOnePlayer(player, isObj=false){
    if(isObj){
      var email = player.email.toString();
      var nick = player.nick.toString();
      var discordname = player.discordname.toString();
      if(discordname.length ==0){discordname = "Not Added";}
      var xp = player.xp.toString();
      return (
        <div className="form-group playerObjs" key={email}>
          <ul>
            <li>Nickname:  {nick}</li>
            <li>Discord:  {discordname}</li>
          </ul>
          {this.state.isGM && 
            <ul>
              <li>Email:  {email}</li>
              <li>XP:  {xp}</li>
            </ul>
          }
          {this.state.isGM && 
            <div>
            <button
              onClick={this.onSubmitDeletePlayer(email) } 
              className="btn btn-danger">
              Remove
            </button>
            <form onSubmit={this.onSubmitXPtoPlayer}>
              <div className="form-group">
                <input type="submit" 
                  style={{float: 'right'}}
                  value="Add XP to Player"
                  className="btn btn-primary"/>
              </div>
              <div className="form-group">
                <label>XP to Player:  </label>
                <input 
                  type="number" 
                  className="form-control" 
                  name={email}
                  value={this.state.xptoplayer}
                  onChange={this.onChangeXPtoPlayer}
                  />
              </div>
            </form>
            </div>
          }
        </div>
      );
    }else{
      return (
        <div className="playerObjs">{player}</div>
      );
    }
  }

  displayPlayers(showGM=false){
    var scopedThis = this;
    const editID = this.props.match.params.id;
    var theArray = this.state.playerObjs;
   

    if(editID && editID.length){
      if(showGM){
        theArray = this.state.gmObjs;
      }
      var showPlayers = theArray.map(function(player) {
        return  scopedThis.displayOnePlayer(player, true) ;
      });
    }else{
      var showPlayers = this.state.players.map(function(player) {
        return  scopedThis.displayOnePlayer(player) ;
      });
    }
    return <div>{showPlayers}</div>;
  }




  displayOneSheet(sheet, isObj=false){
    if(isObj){
      var name = sheet.name.toString();
      var owner = sheet.owner.toString();
      var id = sheet.id.toString();
      var xp = sheet.available_xp.toString();
      console.log("displayOneSheet sheet:", sheet);

      return (
        <div className="form-group sheetObjs" key={id}>
          <h3>Name:  {name}</h3>
          <ul>
            <li>Concept:  {sheet.concept.toString()}</li>
            <li>Description:  {sheet.description.toString()}</li>
            <li>Racial:  {sheet.racial.toString()}</li>
            <li>Virtue & Vice:  {sheet.virtue.toString() +" & "+ sheet.vice.toString()}</li>
          </ul>
          {this.state.isGM && 
            <ul>
              <li>Owner:  {owner}</li>
              <li>XP:  {xp}</li>
            </ul>
          }
          
          {this.state.isGM && 
            <div>
            <Link to={"/edit/"+sheet._id+"#tab1"} className="btn btn-primary">Edit</Link>
            <button
              onClick={this.onSubmitDeleteSheet(id) } 
              className="btn btn-danger">
              Remove
            </button>
            <form onSubmit={this.onSubmitXPtoSheet}>
              <div className="form-group">
                <input type="submit" 
                  style={{float: 'right'}}
                  value="Add XP to Sheet"
                  className="btn btn-primary"/>
              </div>
              <div className="form-group">
                <label>XP to Sheet:  </label>
                <input 
                  type="number" 
                  className="form-control" 
                  name={id}
                  value={this.state.xptosheet}
                  onChange={this.onChangeXPtoSheet}
                  />
              </div>
            </form>
            </div>
          }
          
        </div>
      );
    }else{
      return (
        <div className="sheetObjs">{sheet}</div>
      );
    }
  }

  displaySheets(){
    var scopedThis = this;
    const editID = this.props.match.params.id;
    if(editID && editID.length){
      var showSheets = this.state.sheetObjs.map(function(sheet) {
        return  scopedThis.displayOneSheet(sheet, true) ;
      });
    }else{

    }
    return <div>{showSheets}</div>;
  }

 
  render() {



    return (

        <div style={{ marginTop: 10 }}>
            <h3 align="center">
              { this.props.match.params.id 
                  ? "Update Campaign" 
                  : "Add New Campaign"}
            </h3>

            {this.state.isGM && <p>You are logged in as a GM.</p>}
           

            { this.props.match.params.id 
              ? <button style={{float: 'right'}} onClick={this.undoClearAndRefresh} className="btn btn-danger">Undo Changes</button>
              : ""}
            
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

            


            <div className="form-group">
              <input type="submit" 
                style={{float: 'right'}}
                value={ this.props.match.params.id 
                  ? "Update Campaign" 
                  : "Save Campaign"}
                className="btn btn-primary"/>
            </div>
                    

                
            </form>







          { this.props.match.params.id && <div>

            <div className="bufferDiv"></div>
            <div className="clearfix"></div>
            <p> Invite link to add players to this campaign: </p>
            <h2> https://valnya.fusionbombsderp.com/invite/{this.state.id} </h2>
            



            <div className="bufferDiv"></div>
            <div className="clearfix"></div>

            <h2> GM List: </h2>
            <p> Text descibing the page. </p>
            { this.displayPlayers(true) }


            <div className="bufferDiv"></div>
            <div className="clearfix"></div>

            <h2> Player List: </h2>
            <p> Text descibing the page. </p>
            { this.displayPlayers() }




            <div className="bufferDiv"></div>

            <div className="clearfix"></div>

            <h2> Sheet List: </h2>
            <p> Text descibing the page. </p>
            { this.displaySheets() }
            <div className="bufferDiv"></div>


            {this.state.isGM && 
            <div>
              <form onSubmit={this.onSubmitNewPlayerEmail} className="playerObjs">
                <h2>Add new player by Email:</h2>
                <p> Enter players email and they will be added to this campaign upon submission. </p>
                <div className="form-group">
                  <input type="submit" 
                    style={{float: 'right'}}
                    value="Add New Player"
                    className="btn btn-primary"/>
                </div>
                <div className="form-group">
                  <label>New Player Email:  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={this.state.newplayeremail}
                    onChange={this.onChangeNewPlayerEmail}
                    />
                </div>
              </form>



              <form onSubmit={this.onSubmitNewGMEmail} className="playerObjs">
                <h2>Add new GM by Email:</h2>
                <p> Enter GM's email and they will be added to this campaign as a GM upon submission. </p>
                <div className="form-group">
                  <input type="submit" 
                    style={{float: 'right'}}
                    value="Add New GM"
                    className="btn btn-primary"/>
                </div>
                <div className="form-group">
                  <label>New GM Email:  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={this.state.newgmemail}
                    onChange={this.onChangeNewGMEmail}
                    />
                </div>
              </form>
              <div className="playerObjs">
                <h2> Add Player's sheet to this Campaign: </h2>
                <p> Select a char sheet from on of the campaigns players, and the sheet will be added upon submit. </p>
                <Select options={this.loadSelectArraySheets()} 
                  onChange={this.onChangeAddSheet} 
                  placeholder="Pick Sheet to Add.."
                />
                <div className="form-group">
                <input type="submit" 
                  style={{float: 'right'}}
                  value="Add Sheet"
                  className="btn btn-primary"
                  onClick={this.onSubmitAddSheet}/>
                </div>
              </div>
            </div>
            }

          </div>} 



        </div>
    )
  }
}