import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAC0qaud5YwkNZV7ADHcwf9rpoGH5TPqEs',
  authDomain: 'bootcamp-ce748.firebaseapp.com',
  databaseURL: 'https://bootcamp-ce748.firebaseio.com',
  projectId: 'bootcamp-ce748',
  storageBucket: 'bootcamp-ce748.appspot.com',
  messagingSenderId: '782124421793',
  appId: '1:782124421793:web:b26b23317989a449dad6e0',
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
