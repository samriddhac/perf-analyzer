import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'typeface-roboto';
import PerfAnalyzer from './analyzers/PerfAnalyzer';

import Router from './router/Router';

function App() {
  return (
    <div className="App">
      <Router />
      <PerfAnalyzer />
    </div>
  );
}

export default App;
