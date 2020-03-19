import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';
import rootReducer from './store/modules';

// provier 불러오기
import {Provider} from 'react-redux';

import App from './App';
import './common.css';
import './index.scss';

// create store
const store = createStore(rootReducer);
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
