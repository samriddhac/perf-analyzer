import React, { useState, useEffect } from 'react';
import { HorizontalBar, Doughnut } from 'react-chartjs-2';
import * as resources from '../../../../resources/resources.json';

export default (props) => {
    const [state, setState] = useState({
        id:'',
        sequences:[]
    });

    useEffect(() => {
        if(props)
            setState(props);
    }, [props]);

    const getLabel = (key) => {
        switch (key) {
            case 'network':
                return resources.performance.network;
            case 'render':
                return resources.performance.render;
        }
    }

    return (
        <div className='load-metric-container'>
            <span>{getLabel(state.id)}</span>
            <div className='load-metric'>
                <div className='metric-table'>
                    {state.sequences.map(seq => {
                        return (<div className='metric'>
                            <label>{seq.label}</label>
                            <label>{seq.measure}ms</label>
                        </div>)
                    })}
                    <Doughnut data={{
                        labels: state.sequences.map(item => item.label.substring(0, (item.label.indexOf('(') - 1))),
                        datasets: [{
                            data: state.sequences.map(item => item.measure),
                            backgroundColor: state.sequences.map(item => item.color),
                            hoverBackgroundColor: state.sequences.map(item => item.color)
                        }]
                    }} />
                </div>
                <div className='metric-graph'>
                    <HorizontalBar
                        data={{
                            labels: state.sequences.map(item => item.label.substring(0, (item.label.indexOf('(') - 1))),
                            datasets: [
                                {
                                    label: getLabel(state.id),
                                    backgroundColor: 'rgba(255,99,132,0.2)',
                                    borderColor: 'rgba(255,99,132,1)',
                                    borderWidth: 1,
                                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                    hoverBorderColor: 'rgba(255,99,132,1)',
                                    data: state.sequences.map(item => item.measure)
                                }
                            ]
                        }}
                        width={100}
                        height={200}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </div>
            </div>
        </div>
    );
}