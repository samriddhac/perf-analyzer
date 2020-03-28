import React from 'react';

import RFAFrameRateVisualizer from './RFAFrameRateVisualizer';
import PerfFrameRateVisualizer from './PerfFrameRateVisualizer';

export default () => {

    return (
        <>
            <RFAFrameRateVisualizer />
            <PerfFrameRateVisualizer />
        </>
    );
}