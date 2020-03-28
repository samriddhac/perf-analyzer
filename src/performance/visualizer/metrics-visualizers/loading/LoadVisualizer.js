import React from 'react';
import { useSelector } from 'react-redux';
import * as resources from '../../../../resources/resources.json';
import MetricsVisualizer from './MetricsVisualizer';

export default () => {
    const stats = useSelector(state => state.diagonostics.loadStats.stats);
    const paintstats = useSelector(state => state.diagonostics.paintStats.stats)||[];
    if(stats && Object.keys(stats).length > 0) {
        return (
            <div className='load-container'>
                <span>{resources.performance.load_metrics}</span>
                <div className='paint-stats'>
                {paintstats.map(paint => {
                    return (
                        <label>
                            {paint.name} : {paint.duration}ms
                        </label>
                    )
                })}
                </div>
                {Object.keys(stats).filter(key => !['raw', 'total'].includes(key))
                .map(item => {
                    return <MetricsVisualizer id={item} {...stats[item]} />
                })}
                <span className='total'>{stats.total.label} : {stats.total.measure}ms</span>
            </div>
        );
    }
    return null;
}