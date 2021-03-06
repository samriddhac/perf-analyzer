import React, { useEffect, useRef } from 'react';

import './BasicClock.css';

export default () => {

    const hrRef = useRef(null);
    const minRef = useRef(null);
    const ssRef = useRef(null);

    const numArrays = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const tickArray = [...Array(60).keys()];

    useEffect(() => {
        const hourHand = hrRef.current;
        const minHand = minRef.current;
        const ssHand = ssRef.current;

        const setRotation = (el, ratio) => {
            el.style.setProperty('--rotation', ratio * 360);
        }

        const setClock = () => {
            const currentDate = new Date();
            const secondRatio = currentDate.getSeconds() / 60;
            const minutesRatio = (secondRatio + currentDate.getMinutes()) / 60;
            const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
            setRotation(hourHand, hoursRatio);
            setRotation(minHand, minutesRatio);
            setRotation(ssHand, secondRatio);
        }

        setInterval(setClock, 1000);

        setClock();
    }, []);

    return (
        <div className='basic-container'>
            <div className='basic'>
                <div ref={hrRef} className='hand hr'></div>
                <div ref={minRef} className='hand min'></div>
                <div ref={ssRef} className='hand ss'></div>
                {numArrays.map((num, i) => {
                    const rot = `rotate(${i * 30}deg)`;
                    const numRot = `rotate(-${i * 30}deg)`;
                    return (
                        <div className='tick' style={{ transform: rot }}>
                            <div style={{ transform: numRot }}>{num}</div>
                        </div>
                    )
                })}
                {tickArray.map((num, i) => {
                    const rot = `rotate(${i * 6}deg)`;
                    let fontWeight = 400;
                    if ((i * 6) % 30 === 0) {
                        fontWeight = 900;
                    }
                    return (
                        <div className='smalltick' style={{ transform: rot, fontWeight }}>|
                        </div>
                    )
                })}
            </div>
        </div>
    )

}