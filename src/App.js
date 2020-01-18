import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar'

import { initializeIcons } from '@uifabric/icons';
initializeIcons();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SearchBar />
      </header>

    </div>
  );
}

export default App;
