import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar'
import CourseDetail from './components/CourseDetail'
import Schedule from './components/Schedule'
import CourseOrgChart from './components/CourseOrgChart'

import { initializeIcons } from '@uifabric/icons';
import { DefaultButton } from 'office-ui-fabric-react';

initializeIcons();

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isCourseOpen: false,
      isScheduleOpen: false,
      treeBaseCourse: null,
      selectedCourseId: null,
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

  updateTreeBaseCourse = (course_id) => {
    this.setState({
      treeBaseCourse: course_id
    })
  }

  updateTreeBaseCourse = (course_id) => {
    this.setState({
      treeBaseCourse: course_id
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="Title">CourseTree</div>
          <SearchBar className="SearchBar search-bar" updateTreeBaseCourse={this.updateTreeBaseCourse} />
        </header>
        <div className="tree">
          <CourseDetail courseId={this.state.selectedCourseId} isOpen={this.state.isCourseOpen} toggleOpen={this.toggleCourse} />
          {this.state.treeBaseCourse == null ? <div /> : <CourseOrgChart courseRoot={this.state.treeBaseCourse} handleClick={this.handleCourseClick} />}

          <Schedule isOpen={this.state.isScheduleOpen} toggleOpen={this.toggleSchedule} />
        </div>
        <DefaultButton className="schedule-button" onClick={() => this.toggleSchedule()}>Schedule</DefaultButton>
      </div >
    );
  }
}

export default App;
