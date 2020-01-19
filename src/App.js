import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar'
import CourseDetail from './components/CourseDetail'
import CourseOrgChart from './components/CourseOrgChart'

import { initializeIcons } from '@uifabric/icons';
import { PrimaryButton, thProperties } from 'office-ui-fabric-react';

initializeIcons();

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
      treeBaseCourse: null,
      selectedCourseId: null,
    }
  }

  handleCourseClick = (id) => {
    console.log(id)
    this.setState({ isModalOpen: !this.state.isModalOpen, selectedCourseId: id });
  }

  getOpenState = () => {
    return this.state.isModalOpen;
  }

  toggleOpen = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
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
        <header className="App-header flex-container">
          <div className="Title">CourseTree</div>
          <SearchBar className="SearchBar" updateTreeBaseCourse={this.updateTreeBaseCourse}/>
        </header>
        <div className="tree">
          <CourseDetail courseId={this.state.selectedCourseId} isOpen={this.state.isModalOpen} toggleOpen={this.toggleOpen} />
          {this.state.treeBaseCourse == null ? <div/> : <CourseOrgChart courseRoot="CS 241" handleClick={this.handleCourseClick} />}
        </div>
      </div >
    );
  }
}

export default App;
