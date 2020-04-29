import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

class WeaponTableRow extends Component {

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
        axios.get('/weapon/delete/'+this.props.obj._id,{ baseUrl: "" })
            .then(console.log('Deleted for:', this.props.sheet))
            .then(res => {
                axios.get('/weapon/'+this.props.sheet,{ baseUrl: "" })
                  .then(response => {
                    this.props.weaponSetter(response.data);
                    // this.setState({ hasWeapons: response.data });
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
          <tr style={{display: this.props.obj.damage 
                                || this.props.obj.range 
                                || this.props.obj.ap ? "" : "none"}}>
            <th>Damage:</th>
            <th>AP:</th>
            <th>Range:</th>
          </tr>
          <tr style={{display: this.props.obj.damage 
                                || this.props.obj.range 
                                || this.props.obj.ap ? "" : "none"}}>
            <td> {this.props.obj.damage}</td>
            <td> {this.props.obj.ap}</td>
            <td> {this.props.obj.range}</td>

          </tr>
        </React.Fragment>
        }
            
        </React.Fragment>

    );
  }
}

export default WeaponTableRow;