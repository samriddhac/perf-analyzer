import React from 'react';
import { withRouter } from 'react-router-dom';
import PerformanceVisualizer from '../performance/visualizer/PerformanceVisualizer';


export default withRouter((props) => {

    return(
        <PerformanceVisualizer {...props} />
    );
});