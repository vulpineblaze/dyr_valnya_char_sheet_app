import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
      axios.defaults.baseURL = '';
      axios.get('/sheet/delete/'+this.props.obj._id,{ baseUrl: "" })
            .then(console.log('Deleted'))
            .catch(err => console.log(err));
        // window.open("/");
        window.location = '/';
    }
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.name}
          </td>
          <td>
            {this.props.obj.owner}
          </td>
          <td>
            {this.props.obj.concept}
          </td>
          <td>
            <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;