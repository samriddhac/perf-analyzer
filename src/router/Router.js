import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import About from '../components/about/About';

export default () => {

    return (
        <Router>
            <Switch>
                <Route path='/general' exact>

                </Route>
                <Route path='/3d' exact>

                </Route>
                <Route path='/' exact>
                    <About />
                </Route>
            </Switch>
        </Router>
    );
}