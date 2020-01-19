import React, { Component } from 'react';
import { Modal } from 'office-ui-fabric-react';
import data from '../CS_res.json'

class CourseDetail extends Component {
  constructor(props) {
    super(props);
  }

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
        <div style={{ ...cardContainerStyle }}>
          <h3 style={{ ...cardTextStyle }}>{this.getCourseCode(this.props.courseId)}</h3>
          <h5 style={{ ...cardTextStyle }}>{this.getCourseTitle(this.props.courseId)}</h5>
          <p style={{ ...cardTextStyle }}>{this.getCourseDesc(this.props.courseId)}</p>
        </div>
      </Modal >
    )
  }
}

const cardContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignContent: 'center',
  padding: '5px 10px',
}

const cardTextStyle = {
  textAlign: 'center',
}

export default CourseDetail;