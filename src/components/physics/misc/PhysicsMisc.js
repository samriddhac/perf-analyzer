import React from 'react';

import Header from '../../common/header/Header';
import withPerformance from '../../../performance/PerfHOC';
import * as resources from '../../../resources/resources';

import './PhysicsMisc.css';
import Fundamental from './Fundamental';

const PhysicsMisc = (props) => {

    return (
        <div className='layout'>
            <Header {...props} />
            <div className='layout-1'>
                <div className='base-container'>
                    <h1>{resources.physics.physics_experiments}</h1>
                    <div className='physics-container'>
                        <Fundamental />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withPerformance(PhysicsMisc);