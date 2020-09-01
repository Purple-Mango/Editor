// Placeholder - rewrite in progress

// React Imports
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UI from './UI.js';
// TODO - Look into ServiceWorker to see if it is a good fit for this project
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <UI />
  </React.StrictMode>,
  document.getElementById("root")
);

/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister()
