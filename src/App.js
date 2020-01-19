import React from 'react';

import './App.css';
import CourseOrgChart from './components/CourseOrgChart'

import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { initializeIcons } from '@uifabric/icons';

initializeIcons();

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <SearchBox
          placeholder="Search"
          onSearch={newValue => console.log('value is ' + newValue)}
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onChange={() => console.log('onChange called')}
        />
      <PrimaryButton>I am a button.</PrimaryButton>
      <CourseOrgChart />
    </div>
  );
}

export default App;
