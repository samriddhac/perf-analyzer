import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import * as resources from '../../../../resources/resources.json';

export default () => {

    const [xLabels, setXlabels] = useState([]);
    const [data, setData] = useState([]);
    const rfaFrameRate = useSelector(state => state.diagonostics.framerateStats.rfaFrameRate);
    
    useEffect(() => {
        setXlabels(rfaFrameRate.map((item, index) => { return item.second }));
        setData(rfaFrameRate.map((item, index) => { 
            return item.frameCount
        }));
    }, [rfaFrameRate]);

    return (
        <div className='graph-container'>
            <span>{resources.performance.rfaFrameRate}</span>
            <Line 
                width={window.innerWidth * 0.7}
                height={148}
                data={{
                    labels: xLabels,
                    datasets: [
                        {
                            label: 'Frame Rate',
                            fill: 'origin',
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#000',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            data: data
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    legend: {
                        position: 'top',
                    },
                    hover: {
                        mode: 'label'
                    },
                    elements: {
                        line: {
                            tension: 0 // disables bezier curves
                        }
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Time'
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                suggestedMin: 0,
                                suggestedMax: 100,
                                stepSize: 10
                            }
                        }]
                    }
                }} 
            />
        </div>
    );
}