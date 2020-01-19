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
    this.setState({ isModalOpen: !this.state.isModalOpen, selectedCourseId: 12886 });
    console.log(id)
  }

  getOpenState = () => {
    return this.state.isModalOpen;
  }

  toggleOpen = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
    console.log(this.getOpenState())
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          CourseTree
          <SearchBar />
        </header>
        <PrimaryButton onClick={this.handleCourseClick}>012886</PrimaryButton>
        <PrimaryButton>HI</PrimaryButton>
        <PrimaryButton>HI</PrimaryButton>
        <PrimaryButton>HI</PrimaryButton>
        <CourseDetail courseId={this.state.selectedCourseId} isOpen={this.state.isModalOpen} toggleOpen={this.toggleOpen} />
        <CourseOrgChart />
      </div >
    );
  }
}

export default App;
