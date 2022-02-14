// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAx32MGcrs0XBCgn5HZBVBEedqL0OOEObc',

  authDomain: 'todo-app-db-5c3f5.firebaseapp.com',

  databaseURL:
    'https://todo-app-db-5c3f5-default-rtdb.asia-southeast1.firebasedatabase.app',

  projectId: 'todo-app-db-5c3f5',

  storageBucket: 'todo-app-db-5c3f5.appspot.com',

  messagingSenderId: '134649827226',

  appId: '1:134649827226:web:76fd22fff99a4c04cc3423',

  measurementId: 'G-4YL2MDJMCJ',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export default app;
