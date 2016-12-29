/* eslint-disable */
import React, { Component } from 'react';
import logo from '../logo.svg';
import disableScroll from '../ScrollDisable.js'
import '../App.css';
//import MapComp  from './Map'
import Map from '../Containers/Map.js'
disableScroll()

class App extends Component {
    //<Hero width={TILE_SIZE} height={TILE_SIZE} position={{x: 2, y: 4}} />

  render() {
      
    return (
      
            <Map/>
    );
  }
    
}

export default App;
