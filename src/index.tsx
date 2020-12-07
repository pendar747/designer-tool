import React from 'react';
import ReactDom from 'react-dom';
import App from './App/App';
import './styles/vendor.css';
import './styles/base.css';

import { Provider } from 'react-redux';
import store from './state/store';

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('app-container')
);