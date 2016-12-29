import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { hero } from './Reducers'
import { move } from './Actions'
import { initializeHero} from './World.js'
import './Movement';
import './index.css';

const heroInit = initializeHero()
let store = createStore (hero, Object.assign(heroInit, {camera: {width: 30, height: 30}}))
console.log (store.getState())
ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
  document.getElementById('root')
);
store.dispatch (move({x:0, y:0}))

export default store