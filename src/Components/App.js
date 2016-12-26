import React, { Component } from 'react';
import logo from '../logo.svg';
import disableScroll from '../ScrollDisable.js'
import {TILE_SIZE} from '../World.js'
import Hero from '../Containers/Hero.js'
import '../App.css';

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
            <div className="Map">
                <Hero width={TILE_SIZE} height={TILE_SIZE}/>
            </div>
      </div>
    );
  }
}

export default App;
