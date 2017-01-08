/* eslint-disable */
import React, {
    Component
}
from 'react';
import { Modal } from 'react-bootstrap'
import logo from '../logo.svg';
import disableScroll from '../ScrollDisable'
import '../App.css';
//import MapComp  from './Map'
import Map from '../Containers/Map'
import { HUD }from '../Containers/HUD'
disableScroll()
class App extends Component {

    render() {

        return ( < div > 
                < HUD / > 
                < Map / > 
                < /div> );
        }

    }

    export default App;
