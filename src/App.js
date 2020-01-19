import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar'
import CourseDetail from './components/CourseDetail'
import CourseOrgChart from './components/CourseOrgChart'

import { initializeIcons } from '@uifabric/icons';
import { PrimaryButton } from 'office-ui-fabric-react';

initializeIcons();

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
      selectedCourseId: null,
    }
  }

  handleCourseClick = (id) => {
    console.log(id)
    this.setState({ isModalOpen: !this.state.isModalOpen, selectedCourseId: id });
  }

  toggleOpen = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          CourseTree
          <SearchBar />
        </header>
        <PrimaryButton onClick={this.handleCourseClick}>12886</PrimaryButton>
        <PrimaryButton>HI</PrimaryButton>
        <PrimaryButton>HI</PrimaryButton>
        <PrimaryButton>HI</PrimaryButton>
        <CourseDetail courseId={this.state.selectedCourseId} isOpen={this.state.isModalOpen}
          toggleOpen={this.toggleOpen} />
        <CourseOrgChart courseRoot="CS 241" handleClick={this.handleCourseClick} />
      </div >
    );
  }
}

export default App;
