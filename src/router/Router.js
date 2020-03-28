import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AboutView from '../views/AboutView';
import PerformanceView from '../views/PerformanceView';

export default () => {

    return (
        <Router>
            <Switch>
                <Route path='/general' exact>

                </Route>
                <Route path='/3d' exact>

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