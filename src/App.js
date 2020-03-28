import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'typeface-roboto';
import PerfAnalyzer from './performance/PerfAnalyzer';
import withPerformance from './performance/PerfHOC';

import Router from './router/Router';

function App() {
  return (
    <div className="App">
      <Router />
      <PerfAnalyzer />
    </div>
  );
}

export default withPerformance(App);
