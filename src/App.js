import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar'
import CourseDetail from './components/CourseDetail'
import Schedule from './components/Schedule'
import CourseOrgChart from './components/CourseOrgChart'

import { initializeIcons } from '@uifabric/icons';
import { DefaultButton } from 'office-ui-fabric-react';

import data from './CS_res.json';

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
        1: [data[0]],
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

  addCourse = () => {
    let temp = this.state.coursesTaken;
    temp.push(this.state.selectedCourseCode);
    this.setState({ 
      isCourseOpen: !this.state.isCourseOpen,
      coursesTaken: temp
    });
  }

  courseExists = () => {
    let ret = false;
    for (let c in this.state.coursesTaken){
      if (this.state.coursesTaken[c] == this.state.selectedCourseCode){
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
