import React, { Component } from 'react';
import logo from '../logo.svg';
import disableScroll from '../ScrollDisable.js'
import '../App.css';
import Map  from './Map'
disableScroll()

class App extends Component {
    //<Hero width={TILE_SIZE} height={TILE_SIZE} position={{x: 2, y: 4}} />

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
            <Map/>
      </div>
    );
  }
}

export default App;
