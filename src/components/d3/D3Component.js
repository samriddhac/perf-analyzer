import React from 'react';

import './D3Component.css';
import Header from '../common/header/Header';
import withPerformance from '../../performance/PerfHOC';
import * as resources from '../../resources/resources';

import Basics from './visualizers/Basics';

const D3Component = (props) => {

    const visualizerComponent = () => {
        switch(props.location.pathname) {
            case '/d3-experiment-1':
                return (<Basics />);
            break;
            case '/d3-experiment-2':

            break;
            case '/d3-experiment-3':

            break;
        }
    }

    return (
        <div className='layout'>
            <Header {...props} />
            <div className='layout-1'>
                <div className='base-container'>
                    <h1>{resources.d3.d3_experiments}</h1>
                    {visualizerComponent()}
                </div>
            </div>
        </div>
    );
}

export default withPerformance(D3Component);