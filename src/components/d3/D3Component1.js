import React from 'react';

import './D3Component1.css';
import Header from '../common/header/Header';
import withPerformance from '../../performance/PerfHOC';
import * as resources from '../../resources/resources';

const D3Component1 = (props) => {
    
    return (
        <div className='layout'>
            <Header {...props} />
            <div className='layout-1'>
                <div className='base-container'>
                    <h1>{resources.d3.d3_experiments}</h1>
                </div>
            </div>
        </div>
    );
}

export default withPerformance(D3Component1);