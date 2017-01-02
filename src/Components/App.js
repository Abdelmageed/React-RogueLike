/* eslint-disable */
import React, { Component } from 'react';
import logo from '../logo.svg';
import disableScroll from '../ScrollDisable.js'
import '../App.css';
//import MapComp  from './Map'
import Map from '../Containers/Map.js'
disableScroll()

class App extends Component {
   
  render() {
      
    return (
      
            <Map/>
    );
  }
    
}

export default App;
