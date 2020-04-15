import React, { Component } from 'react';
import axios from 'axios';




const initialState = {
  nick: '',
  discordname: ''
};


export default class PlayerEdit extends Component {
  constructor(props) {
    super(props);

    this.onChangeDiscordName = this.onChangeDiscordName.bind(this);
    this.onChangeNick = this.onChangeNick.bind(this);

    this.undoClearAndRefresh = this.undoClearAndRefresh.bind(this);
    this.clearState = this.clearState.bind(this);
    this.onRefreshFromDB = this.onRefreshFromDB.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = initialState;
    // Object.assign(this.state, {
    //   discordname: this.props.player.discordname,
    //   email: this.props.player.email,
    //   xp: this.props.player.xp
    // });

  }

  



  onChangeDiscordName(e) {
    this.setState({
      discordname: e.target.value
    });
  }
  onChangeNick(e) {
    this.setState({
      nick: e.target.value
    });
  }



  onSubmit(e) {
    e.preventDefault();

    var obj = {
      nick: this.state.nick,
      discordname: this.state.discordname
    };
    axios.defaults.baseURL = '';
    axios.post('/player/update/'+this.props.match.params.id, obj, { baseUrl: "" })
        .then(res => console.log(res.data));

    
    this.props.history.push('/playeredit/'+this.props.match.params.id);  // either way, bounce to ....
    
  }



  componentDidMount() {

    

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

  }


  componentDidUpdate(prevProps, prevState) {

      // console.log("state n prop", this.state.player, this.props.player);
      if(!this.state.discordname){
        console.log("not discordname state", this.state.discord);
        if(this.props.player.discordname){
          console.log("discordname prop exists", this.props.player.discordname);
          this.setState({
            discordname: this.props.player.discordname
          }, () => {
            console.log("discordname updated from props:", this.state.discordname, this.props.player);
          });  
        }else if(this.props.player.email){
          // props is good, but discordname is empty
        }
      }
      if(!this.state.nick && this.props.player.nick){
        this.setState({
          nick: this.props.player.nick
        }, () => {
          console.log("nick updated from props:", this.state.nick, this.props.player);
        });  
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
    axios.get('/player/edit/'+this.props.match.params.id, { baseUrl: "" })
      .then(response => {
        console.log("onRefreshFromDB, response.data:", response.data, this.props.match.params.id);
        const res = response.data;
        this.setState({
          nick: res.nick,
          discordname: res.discordname
        }, () => {
          console.log("ths.state loaded from DB!", this.state);
        });

      })
      .catch(function (error) {
          console.log(error);
      });
    
  }


  clearState(){
    this.setState(initialState, () => {
      console.log("this.state cleared!", this.state);
    });
  }






 
  render() {



    return (

        <div style={{ marginTop: 10 }}>
            <h3 align="center"> Edit Player Data </h3>
           

            <button style={{float: 'right'}} onClick={this.undoClearAndRefresh} className="btn btn-danger">Undo Changes</button>
            
            <form onSubmit={this.onSubmit}>

              

            <div className="form-group">
              <label>Nickname:  </label>
              <input 
                type="text" 
                className="form-control" 
                value={this.state.nick}
                onChange={this.onChangeNick}
                />
            </div>  
            <div className="form-group">
              <label>Discord ID:  </label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="YourName#1234"
                value={this.state.discordname}
                onChange={this.onChangeDiscordName}
                />
            </div>            


            <h3>Email: {this.props.player.email}</h3>

            <h3>XP: {this.props.player.xp}</h3>

            <div className="form-group">
              <input type="submit" 
                style={{float: 'right'}}
                value="Update Player"
                className="btn btn-primary"/>
            </div>
                    

                
            </form>



        </div>
    )
  }
}