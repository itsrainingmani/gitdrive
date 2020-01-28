import React, { Component } from 'react';
import './App.css';
import { GithubRepo } from './components/GithubRepo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            GitDrive
        </header>
        <GithubRepo />
      </div>
    );
  }
}

export default App;
