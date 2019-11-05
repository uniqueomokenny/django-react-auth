import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = "https://talk2toks.pythonanywhere.com";
} else {
    axios.defaults.baseURL = "http://127.0.0.1:8000";
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
