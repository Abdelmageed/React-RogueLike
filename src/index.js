import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { hero } from './Reducers'
//import { move } from './Actions'
import './Movement';
import './index.css';

let store = createStore (hero)

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
  document.getElementById('root')
);

export default store