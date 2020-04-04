import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AboutView from '../views/AboutView';
import D3ExperimentsView1 from '../views/D3ExperimentsView1';
import PerformanceView from '../views/PerformanceView';

export default () => {

    return (
        <Router>
            <Switch>
                <Route path='/general' exact>

                </Route>
                <Route path='/3d' exact>

                </Route>
                <Route path='/d3-experiment-1' exact>
                    <D3ExperimentsView1 />
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