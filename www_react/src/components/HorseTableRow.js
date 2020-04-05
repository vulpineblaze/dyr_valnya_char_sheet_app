import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class HorseTableRow extends Component {

  constructor(props) {
      super(props);
      this.delete = this.delete.bind(this);
      this.toggleRow = this.toggleRow.bind(this);
      this.state = {
        showMore: false
      }
    }
    delete(e) {
        e.preventDefault();

        axios.defaults.baseURL = '';
        axios.get('/horse/delete/'+this.props.obj._id,{ baseUrl: "" })
            .then(console.log('Deleted for:', this.props.sheet))
            .then(res => {
                axios.get('/horse/'+this.props.sheet,{ baseUrl: "" })
                  .then(response => {
                    this.props.horseSetter(response.data);
                    // this.setState({ hasHorses: response.data });
                  })
                  .catch(function (error) {
                    console.log(error);
                  })
              })
            .catch(err => console.log(err));
        // window.open("/");
        // window.location = '/';
    }
    toggleRow(e){
      e.preventDefault();
      // console.log("toggleRow", this.props.index);
      // var i = this.props.index;
      // var elem = this.refs["longTR_"+i];
      // var style = elem.style.display;

      // if(style.includes("none")){
      //   style = "";
      // }else{
      //   style = "none";
      // }
      if(this.state.showMore){
        this.setState({showMore: false});
      }else{
        this.setState({showMore: true});
      }
      


      // console.log("toggleRow", elem, this.refs);
    }
  render() {
    return (
          <React.Fragment>

        <tr>
          <td>
            {this.props.obj.name}
          </td>
          <td>
            {this.props.obj.cost}
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
          <td>
            <button onClick={this.toggleRow} className="btn">More..</button>
          </td>
        </tr>

        { this.state.showMore &&
          <React.Fragment>
          <tr style={{display: this.props.obj.health 
                                || this.props.obj.armor 
                                || this.props.obj.size 
                                || this.props.obj.speed ? "" : "none"}}>
            <th>Health:</th>
            <th>Armor:</th>
            <th>Size:</th>
            <th>Speed:</th>
          </tr>
          <tr style={{display: this.props.obj.health 
                                || this.props.obj.armor 
                                || this.props.obj.size 
                                || this.props.obj.speed ? "" : "none"}}>
            <td> {this.props.obj.health}</td>
            <td> {this.props.obj.armor}</td>
            <td> {this.props.obj.size}</td>
            <td> {this.props.obj.speed}</td>

          </tr>
        </React.Fragment>
        }
            
        </React.Fragment>

    );
  }
}

export default HorseTableRow;