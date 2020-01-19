import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar'
import CourseDetail from './components/CourseDetail'
import CourseOrgChart from './components/CourseOrgChart'

import { initializeIcons } from '@uifabric/icons';

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
          <CourseDetail courseId={this.state.selectedCourseId} isOpen={this.state.isModalOpen} toggleOpen={this.toggleOpen} />
          {this.state.treeBaseCourse == null ? <div /> : <CourseOrgChart courseRoot={this.state.treeBaseCourse} handleClick={this.handleCourseClick} />}
        </div>
      </div >
    );
  }
}

export default App;
