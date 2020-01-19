import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar'
import CourseDetail from './components/CourseDetail'
import Schedule from './components/Schedule'
import CourseOrgChart from './components/CourseOrgChart'

import { initializeIcons } from '@uifabric/icons';
import { DefaultButton } from 'office-ui-fabric-react';

import data from './res.json';

initializeIcons();

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isCourseOpen: false,
      isScheduleOpen: false,
      treeBaseCourse: null,
      selectedCourseCode: null,
      coursesTaken: [],
      coursesChosen: 
      {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
        12: [],
        13: [],
        14: [],
        15: []
      }
    }
  }

  handleCourseClick = (code) => {
    console.log(code)
    this.setState({ isCourseOpen: !this.state.isCourseOpen, selectedCourseCode: code });
  }

  toggleCourse = () => {
    this.setState({ isCourseOpen: !this.state.isCourseOpen });
  }

  toggleSchedule = () => {
    this.setState({ isScheduleOpen: !this.state.isScheduleOpen });
  }

  updateTreeBaseCourse = (coursename) => {
    this.setState({
      treeBaseCourse: coursename
    })
  }

  addCourse = (code) => {
    let avail = data[code]['offered']
    let addedCourse = false;
    for (let i in avail){
      let indexOffset;
      switch (avail[i]){
        case "F":
          indexOffset = 0;
          break;
        case "W":
          indexOffset = 1;
          break;
        case "S":
          indexOffset = 2;
          break;
        default:
          alert("Unable to add.")
          return
      } 
      for (let i = 0; i < Object.keys(this.state.coursesChosen).length; i+=3){
        console.log(parseInt(i) + parseInt(indexOffset))
        let index = parseInt(i) + parseInt(indexOffset) + 1; 
        if (this.state.coursesChosen[index.toString()].length <= 5){
          let bigTemp = this.state.coursesChosen;
          let temp = bigTemp[index.toString()];
          temp.push(data[this.state.selectedCourseCode]);
          bigTemp[index.toString()] = temp;
          addedCourse = true;
          this.setState({
            coursesChosen: bigTemp
          })
          break
        }
      }
      if (addedCourse) { break }
    }
    if (!addedCourse){
      alert("Unable to add.")
      return
    }

    let temp = this.state.coursesTaken;
    temp.push(this.state.selectedCourseCode);
    this.setState({ 
      isCourseOpen: !this.state.isCourseOpen,
      coursesTaken: temp
    });
  }

  courseExists = (code) => {
    let ret = false;
    for (let c in this.state.coursesTaken){
      if (this.state.coursesTaken[c] == code){
        ret = true;
        break;
      }
    }
    return ret;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SearchBar className="SearchBar" updateTreeBaseCourse={this.updateTreeBaseCourse} />
        </header>
        <div className="tree">
          <CourseDetail courseCode={this.state.selectedCourseCode} isOpen={this.state.isCourseOpen} toggleOpen={this.toggleCourse} 
          addCourse={this.addCourse} courseAdded={this.courseExists}/>
          {this.state.treeBaseCourse == null ? <div /> : <CourseOrgChart courseRoot={this.state.treeBaseCourse} handleClick={this.handleCourseClick} />}

          <Schedule isOpen={this.state.isScheduleOpen} toggleOpen={this.toggleSchedule} coursesChosen={this.state.coursesChosen}/>
        </div>
        <DefaultButton className="schedule-button" onClick={() => this.toggleSchedule()}>Schedule</DefaultButton>
      </div >
    );
  }
}

export default App;
