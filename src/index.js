import React from 'react';
import ReactDOM from 'react-dom';
import { Provider  } from 'react-redux'
import configureStore from './redux/store'
import Router from "./router"
import reportWebVitals from './reportWebVitals';
const store = configureStore()
ReactDOM.render(
  <Provider store = {store}>
    <Router />,
   </Provider>,
  document.getElementById('root')
);
reportWebVitals();