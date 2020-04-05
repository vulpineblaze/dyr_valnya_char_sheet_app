import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SpecialtyTableRow extends Component {

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
        axios.get('/specialty/delete/'+this.props.obj._id,{ baseUrl: "" })
            .then(console.log('Deleted for:', this.props.sheet))
            .then(res => {
                axios.get('/specialty/'+this.props.sheet,{ baseUrl: "" })
                  .then(response => {
                    this.props.specialtySetter(response.data);
                    // this.setState({ hasSpecialtys: response.data });
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

      if(this.state.showMore){
        this.setState({showMore: false});
      }else{
        this.setState({showMore: true});
      }
    }

  render() {
    return (

        <tr>
          <td>
            {this.props.obj.specialty}
          </td>
          <td>
            {this.props.obj.cost}
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>

        </tr>
       
    );
  }
}

export default SpecialtyTableRow;