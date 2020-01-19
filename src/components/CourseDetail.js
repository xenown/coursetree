import React, { Component } from 'react';
import '../App.css';
import { Modal, PrimaryButton } from 'office-ui-fabric-react';
import data from '../CS_res.json'

class CourseDetail extends Component {
  constructor(props) {
    super(props)
  }

  getTitle = (code) => {
    for (let item in data) {
      if (data[item]["code"] === code) {
        return data[item]["name"]
      }
    }
  }

  getDesc = (code) => {
    for (let item in data) {
      if (data[item]["code"] === code) {
        return data[item]["description"]
      }
    }
  }

  getOffered = (code) => {
    for (let item in data) {
      if (data[item]["code"] === code) {
        return data[item]["offered"].join(", ")
      }
    }
  }

  getPrereqs = (code) => {
    for (let item in data) {
      if (data[item]["code"] === code) {
        return data[item]["prereq"].join(", ")
      }
    }
  }

  getAntireqs = (code) => {
    for (let item in data) {
      if (data[item]["code"] === code) {
        return data[item]["antireq"].join(", ")
      }
    }
  }

  _close = () => {
    this.props.toggleOpen()
  }

  addCourse = () => {
    this.props.addCourse()
  }

  getDisabled = () => {
    return this.props.courseAdded()
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} onDismiss={this._close} class="modal">
        <div className="details-main-container row">
          <div className="details-container col-9">
            <h3 className="details-title">{this.props.courseCode}</h3>
            <h5 className="details-title">{this.getTitle(this.props.courseCode)}</h5>
            <p className="details-body modal-body">{this.getDesc(this.props.courseCode)}</p>
            <PrimaryButton text={this.getDisabled() ? "Already Added" : "Add"} disabled={this.getDisabled()} onClick={this.addCourse}/>
          </div>
          <div className="details-column col-3">
            <dl>
              <dt>Offered:</dt>
              <dd>{this.getOffered(this.props.courseCode)}</dd>
              <hr />
              <dt>Prereqs:</dt>
              <dd>{this.getPrereqs(this.props.courseCode)}</dd>
              <hr />
              <dt>Antireqs:</dt>
              <dd>{this.getAntireqs(this.props.courseCode)}</dd>
            </dl>
          </div>
        </div>
      </Modal >
    )
  }
}

export default CourseDetail;