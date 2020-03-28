import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default () => {
    const stats = useSelector(state => state.diagonostics.measureStats.stats);
    console.log(stats)
    const [infos, setInfos] = useState([]);
    useEffect(() => {
        //if(stats && stats.length>0)
            //setInfos(stats);
    }, [stats]);
    return null;
}