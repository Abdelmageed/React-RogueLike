import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { game } from './Reducers'
//import { move } from './Actions'
import { initializeHero, setCamera} from './World.js'
import './Movement';
import './Camera'
import './index.css';
const hero = initializeHero()
const camera = setCamera ()
export const store = createStore (game, Object.assign({hero: hero}, {camera: camera}))
//console.log (store.getState())
ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
  document.getElementById('root')
);
//store.dispatch (move({x:0, y:0}))

export default store