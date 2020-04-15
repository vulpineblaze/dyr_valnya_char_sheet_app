import React, { Component } from 'react';
import axios from 'axios';

export default class Invite extends Component {

  constructor(props) {
      super(props);
      this.state = {
        player: {},
        campaign: [],
        mainMsg: "Working..."
      };
    }
    componentDidMount(){
      
    }
    componentDidUpdate(prevProps, prevState) {

      // console.log("state n prop", this.state.player, this.props.player);
      if(!this.state.player.email){
        console.log("not player state", this.state.player);
        if(this.props.player.email){
          console.log("player prop exists", this.props.player);
          this.setState({
            player: this.props.player
          }, () => {
            var campaignID = this.props.match.params.id;
            var fixedEmail = encodeURI(this.state.player.email);
            console.log("invite player:", this.state.player, fixedEmail, campaignID);

            axios.defaults.baseURL = '';
            axios.get('/campaign/invite/'+campaignID+'/'+fixedEmail, { baseUrl: "" })
              .then(res => {
                console.log("res invite:",res.data);
                var msg = "You have been added to: \""+res.data.name+" \""
                this.setState({
                  mainMsg: msg,
                  campaign: res.data
                });
              });
          });  
        }
      }
    }



    render() {
      if(!this.state.player.email) return null
      return (
        <div>
          <h3 align="center"> {this.state.mainMsg} </h3>

        </div>
      );
    }
  }