import React, { useEffect } from 'react';

import Header from '../../common/header/Header';
import BasicClock from './models/basic/BasicClock';
import BasicClockBlue from './models/basic/BasicClockBlue';
import BasicClockRed from './models/basic/BasicClockRed';
import DigitalClock from './models/digital/DigitalClock';
import PendulamClock from './models/basic/PendulamClock';
import PendulamClockRoman from './models/basic/PendulamClockRoman';

import './Clocks.css';

export default (props) => {

    return (
        <div className='layout'>
            <Header {...props} />
            <div className='layout-1'>
                <div className='base-container'>
                    <div className='clock-container'>
                        <BasicClock />
                        <BasicClockBlue />
                        <BasicClockRed />
                        <DigitalClock />
                        <PendulamClock />
                        <PendulamClockRoman />
                    </div>
                </div>
            </div>
        </div>
    )
}