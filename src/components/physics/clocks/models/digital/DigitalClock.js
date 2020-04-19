import React, { useEffect, useRef } from 'react';
import './DigitalClock.css';

export default () => {
    const hhRef = useRef();
    const mmRef = useRef();
    const ssRef = useRef();
    const pamRef = useRef();
    const ddRef = useRef();
    const mmmRef = useRef();
    const yyRef = useRef();
    const dayRef = useRef();

    useEffect(()=>{
        const hhEl = hhRef.current;
        const mmEl = mmRef.current;
        const ssEl = ssRef.current;
        const pamEl = pamRef.current;
        const ddEl = ddRef.current;
        const mmmEl = mmmRef.current;
        const yyEl = yyRef.current;
        const dayEl = dayRef.current;

        const setValue = (el, value) => {
            el.textContent = value;
        }

        const day = (val) => {
            switch(val) {
                case 0: 
                    return 'SunDay';
                case 1: 
                    return 'MonDay';
                case 2: 
                    return 'TuesDay';
                case 3: 
                    return 'WednesDay';
                case 4: 
                    return 'ThursDay';
                case 5: 
                    return 'FriDay';
                case 6: 
                    return 'SaturDay';
            }
        }

        const month = (val) => {
            switch(val) {
                case 0: 
                    return 'January';
                case 1: 
                    return 'February';
                case 2: 
                    return 'March';
                case 3: 
                    return 'April';
                case 4: 
                    return 'May';
                case 5: 
                    return 'June';
                case 6: 
                    return 'July';
                case 7: 
                    return 'August';
                case 8: 
                    return 'September';
                case 9: 
                    return 'October';
                case 10: 
                    return 'November';
                case 11: 
                    return 'December';
            }
        }

        const formatZero = (value) => {
            if(value<10)
                return "0"+value;
            return value;
        }

        const hour = (value) => {
            if(value >= 12) 
                return value - 12;
            return value;
        }

        const setDate = () => {
            const currentDate = new Date();

            setValue(hhEl, formatZero(hour(currentDate.getHours())));
            setValue(mmEl, formatZero(currentDate.getMinutes()));
            setValue(ssEl, formatZero(currentDate.getSeconds()));
            setValue(pamEl, currentDate.getHours()>12?'PM':'AM');

            setValue(dayEl, day(currentDate.getDay()));
            setValue(ddEl, formatZero(currentDate.getDate()));
            setValue(mmmEl, month(currentDate.getMonth()));
            setValue(yyEl, currentDate.getFullYear());
        }

        setInterval(setDate, 1000);
        setDate();

    }, []);

    return (
        <div className='digital-container'>
            <div className='digital'>
                <div className='digital-main'>
                    <div className='data-container'>
                        <div className='time'>
                            <span ref={hhRef} className='num'></span>
                            <span>:</span>
                            <span ref={mmRef} className='num'></span>
                            <span>:</span>
                            <span ref={ssRef} className='num'></span>
                            <span ref={pamRef} className='num'></span>
                        </div>
                        <div className='date'>
                            <span ref={dayRef} className='num'></span>
                            <span>,</span>
                            <span ref={ddRef} className='num'></span>
                            <span ref={mmmRef} className='num'></span>
                            <span>,</span>
                            <span ref={yyRef} className='num'></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}