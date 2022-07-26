import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import store from './store';
import './App.css';

export default function App() {
  return (
    <Provider store={store()}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}
