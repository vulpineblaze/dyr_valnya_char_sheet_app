import React, { Component } from 'react';
import axios from 'axios';
import CampaignTableRow from './CampaignTableRow';

export default class ListCampaign extends Component {

  constructor(props) {
      super(props);
      this.state = {
        player: {},
        asPlayer: [],
        asGM: []
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
            var fixedEmail = encodeURI(this.state.player.email);
            console.log("index get email:", fixedEmail, this.props.player, this.props.user);
            axios.defaults.baseURL = '';
            axios.get('/campaign/gp/'+fixedEmail ,{ baseUrl: "" })
              .then(response => {
                console.log("finally, set campaigns", response);

                this.setState({ 
                  asPlayer: response.data.asPlayer,
                  asGM: response.data.asGM
                });
              })
              .catch(function (error) {
                console.log(error);
              })
          });  
        }
      }
    }

    tabRowP(){
      return this.state.asPlayer.map(function(object, i){
          return <CampaignTableRow obj={object} key={i} noDelete={true} />;
      });
    }
    tabRowG(){
      return this.state.asGM.map(function(object, i){
          return <CampaignTableRow obj={object} key={i} />;
      });
    }

    render() {
      if(!this.state.player.email) return null
      return (
        <div>
          <h3 align="center">Campaign List As GM</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRowG() }
            </tbody>
          </table><h3 align="center">Campaign List As Player</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRowP() }
            </tbody>
          </table>
        </div>
      );
    }
  }