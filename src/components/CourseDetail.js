import React, { Component } from 'react';

class CourseDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {

    return (
      <div style={{ ...cardContainerStyle }}>
        <h3 style={{ ...cardTextStyle }}>{this.props.courseCode}</h3>
        <h5 style={{ ...cardTextStyle }}>{this.props.courseTitle}</h5>
      </div>
    )
  }
}

const cardContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignContent: 'center',
  border: 'black',
  borderStyle: 'solid',
  padding: '5px 10px',
}

const cardTextStyle = {
  textAlign: 'center',
}

export default CourseDetail;