import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import DataProvider from './redux/store'
import reportWebVitals from './reportWebVitals';
import {DataProviders} from './GlobalState';
import ChatBot from 'react-simple-chatbot';
import { Provider } from 'react-redux';
import store from "./GlobalState"
const steps = [
  {
    id: '0',
    message: 'Welcome to react chatbot!',
    trigger: '1',
  },
  {
    id: '1',
    message: 'Bye!',
    end: true,
  },
];
ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
  
    <Provider store={store}>
      <App />
      </Provider>
   
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
reportWebVitals();