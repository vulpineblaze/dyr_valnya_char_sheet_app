import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {sheet: []};
    }
    componentDidMount(){
      axios.defaults.baseURL = '';
      axios.get('/sheet',{ baseUrl: "" })
        .then(response => {
          this.setState({ sheet: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
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
    }

    tabRow(){
      return this.state.sheet.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }

    render() {
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