import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import * as resources from '../../../../resources/resources.json';

export default () => {
    const stats = useSelector(state => state.diagonostics.measureStats.stats);
    console.log(stats)
    const [infos, setInfos] = useState([]);
    
    useEffect(() => {
        if(stats && stats.length>0)
            setInfos(stats);
    }, [stats]);

    return (
        <div className='load-container'>
            <span>{resources.performance.component_metrics}</span>
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>{resources.performance.component_name}</th>
                            <th>{resources.performance.measure_type}</th>
                            <th>{resources.performance.start_time}</th>
                            <th>{resources.performance.duration}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {infos.map(item => {
                            return (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.entryType}</td>
                                    <td>{item.startTime}</td>
                                    <td>{item.duration}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}