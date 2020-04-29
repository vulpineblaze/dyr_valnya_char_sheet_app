import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

class MagickaTableRow extends Component {

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
        axios.get('/magicka/delete/'+this.props.obj._id,{ baseUrl: "" })
            .then(console.log('Deleted for:', this.props.sheet))
            .then(res => {
                axios.get('/magicka/'+this.props.sheet,{ baseUrl: "" })
                  .then(response => {
                    this.props.magickaSetter(response.data);
                    // this.setState({ hasMagickas: response.data });
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
          <tr><th>Description:</th></tr>
          <tr><td>{this.props.obj.desc}</td></tr>
          <tr style={{display: this.props.obj.armor 
                                || this.props.obj.penalty 
                                || this.props.obj.damage 
                                || this.props.obj.ap ? "" : "none"}}>
            <th>Armor:</th>
            <th>Penalty:</th>
            <th>Damage:</th>
            <th>AP:</th>
          </tr>
          <tr style={{display: this.props.obj.armor 
                                || this.props.obj.penalty 
                                || this.props.obj.damage 
                                || this.props.obj.ap ? "" : "none"}}>
            <td> {this.props.obj.armor}</td>
            <td> {this.props.obj.penalty}</td>
            <td> {this.props.obj.damage}</td>
            <td> {this.props.obj.ap}</td>

          </tr>
        </React.Fragment>
        }
            
        </React.Fragment>

    );
  }
}

export default MagickaTableRow;