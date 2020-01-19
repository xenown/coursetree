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
      selectedCourseId: null,
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

  handleCourseClick = (id) => {
    console.log(id)
    this.setState({ isCourseOpen: !this.state.isCourseOpen, selectedCourseId: id });
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SearchBar className="SearchBar" updateTreeBaseCourse={this.updateTreeBaseCourse} />
        </header>
        <div className="tree">
          <CourseDetail courseId={this.state.selectedCourseId} isOpen={this.state.isCourseOpen} toggleOpen={this.toggleCourse} />
          {this.state.treeBaseCourse == null ? <div /> : <CourseOrgChart courseRoot={this.state.treeBaseCourse} handleClick={this.handleCourseClick} />}

          <Schedule isOpen={this.state.isScheduleOpen} toggleOpen={this.toggleSchedule} coursesChosen={this.state.coursesChosen}/>
        </div>
        <DefaultButton className="schedule-button" onClick={() => this.toggleSchedule()}>Schedule</DefaultButton>
      </div >
    );
  }
}

export default App;
