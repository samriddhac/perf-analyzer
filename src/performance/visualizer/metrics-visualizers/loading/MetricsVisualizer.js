import React from 'react';
import { HorizontalBar, Doughnut } from 'react-chartjs-2';
import * as resources from '../../../../resources/resources.json';

export default (props) => {

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
            <span>{getLabel(props.id)}</span>
            <div className='load-metric'>
                <div className='metric-table'>
                    {props.sequences.map(seq => {
                        return (<div className='metric'>
                            <label>{seq.label}</label>
                            <label>{seq.measure}ms</label>
                        </div>)
                    })}
                    <Doughnut data={{
                        labels: props.sequences.map(item => item.label.substring(0, (item.label.indexOf('(') - 1))),
                        datasets: [{
                            data: props.sequences.map(item => item.measure),
                            backgroundColor: props.sequences.map(item => item.color),
                            hoverBackgroundColor: props.sequences.map(item => item.color)
                        }]
                    }} />
                </div>
                <div className='metric-graph'>
                    <HorizontalBar
                        data={{
                            labels: props.sequences.map(item => item.label.substring(0, (item.label.indexOf('(') - 1))),
                            datasets: [
                                {
                                    label: getLabel(props.id),
                                    backgroundColor: 'rgba(255,99,132,0.2)',
                                    borderColor: 'rgba(255,99,132,1)',
                                    borderWidth: 1,
                                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                    hoverBorderColor: 'rgba(255,99,132,1)',
                                    data: props.sequences.map(item => item.measure)
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