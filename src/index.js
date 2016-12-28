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
let store = createStore (hero, heroInit)
ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
  document.getElementById('root')
);
store.dispatch (move({x:0, y:0}))

export default store