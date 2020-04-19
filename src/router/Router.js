import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AboutView from '../views/AboutView';
import D3ExperimentsView from '../views/D3ExperimentsView';
import PhysicsMiscView from '../views/PhysicsMiscView';
import ClockView from '../views/ClockView';
import PerformanceView from '../views/PerformanceView';

export default () => {

    return (
        <Router>
            <Switch>
                <Route path='/general' exact>

                </Route>
                <Route path='/3d' exact>

                </Route>
                <Route path='/physics-misc' exact>
                    <PhysicsMiscView />
                </Route>
                <Route path='/clocks' exact>
                    <ClockView />
                </Route>
                <Route path='/d3-experiment-1' exact>
                    <D3ExperimentsView />
                </Route>
                <Route path='/d3-experiment-2' exact>
                    <D3ExperimentsView />
                </Route>
                <Route path='/d3-experiment-3' exact>
                    <D3ExperimentsView />
                </Route>
                <Route path='/performance' exact>
                    <PerformanceView />
                </Route>
                <Route path='/' exact>
                    <AboutView />
                </Route>
            </Switch>
        </Router>
    );
}