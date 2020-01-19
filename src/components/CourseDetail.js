import React, { Component } from 'react';
import '../App.css';
import { Modal } from 'office-ui-fabric-react';
import data from '../CS_res.json'

class CourseDetail extends Component {
  getCourseCode = (id) => {
    for (let item in data) {
      if (data[item]["id"] === id) {
        return data[item]["code"]
      }
    }
  }

  getCourseTitle = (id) => {
    for (let item in data) {
      if (data[item]["id"] === id) {
        return data[item]["name"]
      }
    }
  }

  getCourseDesc = (id) => {
    for (let item in data) {
      if (data[item]["id"] === id) {
        return data[item]["description"]
      }
    }
  }

  _close = () => {
    this.props.toggleOpen()
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} onDismiss={this._close} class="modal">
        <div class="details-container">
          <h3 class="details-text">{this.getCourseCode(this.props.courseId)}</h3>
          <h5 class="details-text">{this.getCourseTitle(this.props.courseId)}</h5>
          <p class="details-text">{this.getCourseDesc(this.props.courseId)}</p>
        </div>
      </Modal >
    )
  }
}

export default CourseDetail;