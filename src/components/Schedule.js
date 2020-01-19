import React, { Component } from 'react';
import '../App.css';
import { Panel } from 'office-ui-fabric-react';
import data from '../CS_res.json'

class Schedule extends Component {
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
      <Panel isOpen={this.props.isOpen} onDismiss={this._close} class="panel">
        <div className="details-main-container row">
          <div className="details-container col-9">
            <dl>
              {
                Object.keys(this.props.coursesChosen).map((key) => {
                  this.props.coursesChosen[key].map((course) => {
                    return (<div className="card">
                      {course.code}
                    </div>)
                  });
                })}
              {/* <dt>Prereqs:</dt>
              <dd>{this.getPrereqs(12766)}</dd>
              <hr />
              <dt>Antireqs:</dt>
              <dd>{this.getAntireqs(12766)}</dd>
              <hr /> */}
            </dl>
            {/* <h3 className="details-title">{this.getCode(12766)}</h3>
            <h5 className="details-title">{this.getTitle(12766)}</h5>
            <p className="details-body modal-body">{this.getDesc(12766)}</p> */}
          </div>
          <div className="details-column col-3">
            <dl>
              <dt>Offered:</dt>
              <dd>{this.getOffered(12766)}</dd>
              <hr />
              <dt>Prereqs:</dt>
              <dd>{this.getPrereqs(12766)}</dd>
              <hr />
              <dt>Antireqs:</dt>
              <dd>{this.getAntireqs(12766)}</dd>
            </dl>
          </div>
        </div>
      </Panel >
    )
  }
}

export default Schedule;