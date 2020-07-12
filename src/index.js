import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from "react-dom";
import App from "./App";
// import store from "./Redux/Store";  // Store without Redux
import store from './Redux/redux-store'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";


  ReactDOM.render(
       <BrowserRouter basename={process.env.PUBLIC_URL}>
           <Provider store={store}>
               <App />
           </Provider>
       </BrowserRouter>, document.getElementById('root'));


// store.subscribe (renderEntireTree);  // state without redux


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
