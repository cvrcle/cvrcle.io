import React, { Component } from 'react';
import ReactDOM from "react-dom";
import axios from "axios";
import { Card, Modal } from 'semantic-ui-react';
import EditModal from './EditModal.jsx';
import $ from 'jquery'; 

class ContributorEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      id: "",
      title: "",
      author: "",
      body: "",
      date: "",
      address: "",
      name: ""
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.updateEntry = this.updateEntry.bind(this);
    this.updateState = this.updateState.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  componentDidMount() {
    this.updateState();
  }

  updateState() {
    this.setState({
      id: this.props.id,
      title: this.props.title,
      author: this.props.author,
      body: this.props.body,
      date: this.props.date,
      address: this.props.address,
      contributorID: this.props.contributorID
    })
  }

  toggleModal() {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  updateEntry(incomingData) {
    this.setState({
      title: incomingData.title,
      body: incomingData.body,
      address: incomingData.address,
      author: incomingData.author,
      name: incomingData.name
    })
  }

  deleteEntry(e) {
    e.preventDefault();
    e.stopPropagation();

    var id = e.target.parentElement.parentElement.id;

    //ROUTE IS WRONG? ENTRY NOT DELETING
    axios.delete(`http://localhost:3000/entries?id=${this.state.id}&itinID=1`)
      .then((res) => {
        console.log("reserser", res);
        $('#'+id).remove();
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="single-entry">
        {this.state.isEditing ? 
          <EditModal resetFlag={this.toggleModal} updateEntry={this.updateEntry} data={this.state}/> 
          : "" }
        <Card id={"id-"+this.state.id} color="teal" className="entry" onClick={this.toggleModal}>
          <Card.Content>
            <span className="remove-btn glyphicon glyphicon-remove" id={this.state.id} onClick={this.deleteEntry}></span>
            <Card.Header> 
              {this.state.title}
            </Card.Header>
            <Card.Meta>
              {this.state.address}
            </Card.Meta>
            <Card.Description>
              {this.state.body}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <span className="author">Contributed By: {this.state.author}</span>
            <span className="date">{this.state.date}</span>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default ContributorEntry;
 