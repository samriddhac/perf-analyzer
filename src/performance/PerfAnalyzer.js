import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';

import { usePerformanceObserver, useNavigationObserver } from './measures/PerfomanceObserver';
import { captureRFAFrameRateStats } from '../store/actions/AppActions';

export default () => {

    const dispatch = useDispatch();
    const location = window.location;

    let frameRate = [];
    let currentFrameRate = 0;
    let seconds = 0;

    let time = null;

    window.onload = () => {
        setInterval(() => {
            captureFrameRate();
        }, 1000);
    }

    const captureFrameRate = () => {
        ++seconds;
        time.setTime(time.getTime() + (1 * 1000));
        frameRate.push({
            second: time.toLocaleString().slice(12),
            frameCount: currentFrameRate
        });
        if (frameRate.length > 60) {
            frameRate.shift();
        }
        dispatch(captureRFAFrameRateStats(frameRate));
        currentFrameRate = 0;
    }

    const measure = () => {
        currentFrameRate++;
        requestAnimationFrame(measure);
    }

    useEffect(() => {
        time = new Date();
        setTimeout(() => {
            useNavigationObserver(dispatch);
        }, 0);
        usePerformanceObserver();
        requestAnimationFrame(measure);
    }, []);

    if (!location.pathname.includes('/performance')) {
        return (
            <div className='performance-btn'>
                <Button color="danger" size='sm'>
                    <a href="/performance" target='_blank'>performance</a>
                </Button>
            </div>
        );
    }
    return null;
}