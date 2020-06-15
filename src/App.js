import React from 'react';

import Routes from './routes'
import Header from './containers/Header'
import SidePanel from './containers/SidePanel';
import Toaster from './containers/Toaster'

import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <SidePanel />
      <Routes />
      <Toaster />
    </div>
  );
}

export default App;
