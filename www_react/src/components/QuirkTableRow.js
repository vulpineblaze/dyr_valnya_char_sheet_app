import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

class QuirkTableRow extends Component {

  constructor(props) {
      super(props);
      this.delete = this.delete.bind(this);
      this.toggleRow = this.toggleRow.bind(this);
      this.state = {
        showMore: false,
        moreText: "More.."
      }
    }
    delete(e) {
        e.preventDefault();

        axios.defaults.baseURL = '';
        axios.get('/quirk/delete/'+this.props.obj._id,{ baseUrl: "" })
            .then(console.log('Deleted for:', this.props.sheet))
            .then(res => {
                axios.get('/quirk/'+this.props.sheet,{ baseUrl: "" })
                  .then(response => {
                    this.props.quirkSetter(response.data);
                    // this.setState({ hasQuirks: response.data });
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
        this.setState({showMore: false, moreText:"More.."});
      }else{
        this.setState({showMore: true, moreText:"..Less"});
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
            {this.props.obj.desc}
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
          <td>
            <button onClick={this.toggleRow} className="btn">{this.state.moreText}</button>
          </td>
        </tr>

        { this.state.showMore &&
        <React.Fragment>
          <tr style={{display: (this.props.obj.prereq.includes("N/A") || !this.props.obj.prereq) ? "none" : ""}}>
            <th>Pre-Requistes:</th>
            <td colSpan="4"> {this.props.obj.prereq}
            </td>
          </tr>
          <tr style={{display: this.props.obj.benefit ? "" : "none"}}>
            <th>Benefit:</th>
            <td colSpan="4"> {this.props.obj.benefit}
            </td>
          </tr>
          <tr style={{display: (this.props.obj.aspects&&this.props.obj.aptitudes) ? "" : "none"}}>
            <th>Aspect & Aptitude:</th>
            <td colSpan="2"> {this.props.obj.aspects}</td>
            <td colSpan="2"> {this.props.obj.aptitudes}</td>
          </tr>
        </React.Fragment>
        }
            
        </React.Fragment>

    );
  }
}

export default QuirkTableRow;