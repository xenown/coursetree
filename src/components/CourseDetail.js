import React, { Component } from 'react';
import '../App.css';
import { Modal } from 'office-ui-fabric-react';
import data from '../CS_res.json'

class CourseDetail extends Component {
  getCode = (id) => {
    for (let item in data) {
      if (data[item]["id"] === id) {
        return data[item]["code"]
      }
    }
  }

  getTitle = (id) => {
    for (let item in data) {
      if (data[item]["id"] === id) {
        return data[item]["name"]
      }
    }
  }

  getDesc = (id) => {
    for (let item in data) {
      if (data[item]["id"] === id) {
        return data[item]["description"]
      }
    }
  }

  getOffered = (id) => {
    for (let item in data) {
      if (data[item]["id"] === id) {
        return data[item]["offered"].join(", ")
      }
    }
  }

  getPrereqs = (id) => {
    for (let item in data) {
      if (data[item]["id"] === id) {
        return data[item]["prereq"].join(", ")
      }
    }
  }

  getAntireqs = (id) => {
    for (let item in data) {
      if (data[item]["id"] === id) {
        return data[item]["antireq"].join(", ")
      }
    }
  }

  _close = () => {
    this.props.toggleOpen()
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} onDismiss={this._close} className="modal">
        <div className="details-main-container row">
          <div className="details-container col-9">
            <h3 className="details-title">{this.getCode(this.props.courseId)}</h3>
            <h5 className="details-title">{this.getTitle(this.props.courseId)}</h5>
            <p className="details-body modal-body">{this.getDesc(this.props.courseId)}</p>
          </div>
          <div className="details-column col-3">
            <dl>
              <dt>Offered:</dt>
              <dd>{this.getOffered(this.props.courseId)}</dd>
              <hr />
              <dt>Prereqs:</dt>
              <dd>{this.getPrereqs(this.props.courseId)}</dd>
              <hr />
              <dt>Antireqs:</dt>
              <dd>{this.getAntireqs(this.props.courseId)}</dd>
            </dl>
          </div>
        </div>
      </Modal >
    )
  }
}

export default CourseDetail;