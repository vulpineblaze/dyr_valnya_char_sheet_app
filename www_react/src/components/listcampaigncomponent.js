import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {
        player: {},
        sheet: []
      };
    }
    componentDidMount(){
      
      
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevState.sheet !== this.state.sheet) {
        console.log("index; does not equal:", prevState.sheet,this.state.sheet);
        if(prevState.sheet.name !== this.state.sheet.name){
          console.log("index; name not equal:", prevState.sheet.name , this.state.sheet.name);
        }
      }else{
        console.log("index; sheets are equal:", prevState.sheet,this.state.sheet);

      }
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
            axios.get('/sheet/'+fixedEmail ,{ baseUrl: "" })
              .then(response => {
                console.log("finally, set sheets", response);
                this.setState({ sheet: response.data });
              })
              .catch(function (error) {
                console.log(error);
              })
          });  
        }
      }
    }

    tabRow(){
      return this.state.sheet.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }

    render() {
      if(!this.state.player.email) return null
      return (
        <div>
          <h3 align="center">Character Sheet List</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Owner</th>
                <th>Concept</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }