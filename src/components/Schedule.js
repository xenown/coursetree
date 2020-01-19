import React, { Component } from 'react';
import '../App.css';
import { Panel } from 'office-ui-fabric-react';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import data from '../CS_res.json'

class Schedule extends Component {

  courseClass = mergeStyles({
    fontSize: 15,
    height: 10,
    width: 10,

  });

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

  generateTerm = (num) => {
    switch(num % 3){
      case 0:
        return "Spring"
      case 1:
        return "Fall"
      case 2:
        return "Winter"
      default:
        return ""
    }
  }

  render() {
    return (
      <Panel isOpen={this.props.isOpen} onDismiss={this._close} class="panel" styles={{right: "auto"}}>
        <div className="details-main-container row">
          <div className="schedule-details-column col-9">
            {
              Object.keys(this.props.coursesChosen).map((key, index) => {
                return (<dl className="ScheduleRow" key={index}>
                  {this.props.coursesChosen[key].map((course, index) => {
                    return (<div className="card CourseLabel card-header schedule-course-node-title" key={index}>
                      {course.code}
                    </div>)
                  })}
                  <hr />
                </dl>)
              })
            }
          </div>
          <div className="schedule-details-column col-3">
            {
              Object.keys(this.props.coursesChosen).map((key, index) => {
                return (<dl className="ScheduleRow" key={index}>
                  <div className="card CourseLabel card-header schedule-course-node-title" key={index}>
                    {this.generateTerm(parseInt(key))}
                  </div>
                  <hr />
                </dl>)
              })
            }
          </div>
        </div>
      </Panel >
    )
  }
}

export default Schedule;