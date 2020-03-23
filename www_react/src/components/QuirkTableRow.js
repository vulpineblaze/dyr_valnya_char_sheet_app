import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class QuirkTableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.get('/quirk/delete/'+this.props.obj._id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err));
        // window.open("/");
        window.location = '/';
    }
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.quirk}
          </td>
          <td>
            {this.props.obj.sheet}
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default QuirkTableRow;