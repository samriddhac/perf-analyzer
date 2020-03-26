import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';

import {captureLoadStats, captureFrameRateStats} from '../store/actions/AppActions';

export default () => {

    const dispatch = useDispatch();

    let frameRate = [];
    let currentFrameRate = 0;
    let seconds = 0;

    window.onload = () => {
        setTimeout(() => {
            showTimingDetails();
            showResourceTimingDetails();
        }, 0);
        setInterval(() => {
            captureFrameRate();
        }, 1000);
    }

    const captureFrameRate = () => {
        ++seconds;
        frameRate.push({
            second: seconds,
            frameCount: currentFrameRate
        });
        if(frameRate.length>300) {
            frameRate.shift();
        }
        dispatch(captureFrameRateStats(frameRate));
        currentFrameRate = 0;
    }

    const measure = () => {
        currentFrameRate++;
        requestAnimationFrame(measure);
    }

    useEffect(() => {
        requestAnimationFrame(measure);
    }, []);
    
    const showTimingDetails = () => {
        const [entry] = performance.getEntries();
        console.table(entry.toJSON());
    }

    const showResourceTimingDetails = () => {
        const [entry] = performance.getEntriesByType('resource');
        console.table(entry.toJSON());
    }

    const getPageLoadTime = () => {
        const perfData = performance.timing;
        return perfData.loadEventEnd - perfData.navigationStart;
    }

    return (
        <div className='performance-btn'>
            <Button color="danger" size='sm'>performance</Button>
        </div>
    );
}