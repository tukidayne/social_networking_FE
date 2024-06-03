import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore, compose } from "redux";
import { Provider } from "react-redux";
import appReducers from "./redux/reducers/Index";
import thunk from "redux-thunk";

const store = createStore(
  appReducers,
  compose(
    applyMiddleware(thunk),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store = { store }>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
