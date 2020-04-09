import React, { useEffect } from 'react';
import _ from 'lodash';
import * as d3 from 'd3';

export default () => {
    const t = d3.transition().duration(750);

    const generateItalyDeathRate = () => {
        const margin = {
            top: 60,
            right: 20,
            bottom: 100,
            left: 80
        };
        const width = 640 - margin.left  - margin.right;
        const height = 480 - margin.top  - margin.bottom;
        const continentColor = d3.scaleBand(d3.schemePastel1);
        const group = d3.select('#scatter-chartarea')
            .append('svg')
                .attr('width', width + margin.left + margin.top)
                .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

        //x label
        group.append('text')
            .attr('y', height + 50)
            .attr('x', width/2)
            .attr('font-size', '0.8rem')
            .attr('color', 'blue')
            .attr('text-anchor', 'middle')
            .text('Time');
        
        //y label
        group.append('text')
            .attr("y", -60)
            .attr("x", -(height / 2))
            .attr('font-size', '0.8rem')
            .attr('color', 'blue')
            .attr('text-anchor', 'middle')
            .attr("transform", "rotate(-90)")
            .text('COVID-19 Death Count');

        const xAxisScatterGroup = group.append('g')
            .attr('class', 'x axis')
            .attr("transform", "translate(0," + height +")");

        const yAxisScatterGroup = group.append('g')
            .attr('class', 'y axis');

        // X Scale
        const x = d3.scaleTime()
            .range([0, width]);

        // Y Scale
        const y = d3.scaleLinear()
            .range([0, height]);

        d3.csv('/data/total-deaths-covid-19.csv').then(data => {
            data.forEach(item => item.Deaths = parseInt(item.Deaths));
            const groups = _.groupBy(data, 'Code');
            const normalizedData = groups["ITA"].map(obj => {
                return {
                    date: new Date(obj.Date),
                    death: obj.Deaths
                }
            });
            d3.interval(() => {
                update(normalizedData);
            }, 1000);
            update(normalizedData);
        });
        const update = (data) => {
            x.domain([d3.min(data, (d) => d.date), d3.max(data, (d) => d.date)]);
            y.domain([d3.max(data, (d) => d.death), 0]);

            const xAxis = d3.axisBottom(x);
            xAxisScatterGroup.call(xAxis);

            const yAxis = d3.axisLeft(y)
                .tickFormat((d) => `#${d}`);    
            yAxisScatterGroup.call(yAxis);

            const circles = group.selectAll('circle')
                .data(data);

            //Remove old data.
            circles.exit().remove();

            //Enter new elements of new data.
            circles.enter()
                .append('circle')
                .attr('class', 'enter')
                .attr('fill', (d) => {
                    return '#F5A9A9';
                })
                .transition(t)
                    .attr('cx', (d) => {
                        return x(d.date)+5;
                    })
                    .attr('cy', (d) => {
                        return y(d.death)-3;
                    })
                    .attr('r', 3);
        }
    }

    useEffect(() => {
        generateItalyDeathRate();
    }, []);

    return (
        <div className='chart-container'>
            <span> COVID-19 Death Count-Italy</span>
            <div id='scatter-chartarea'></div>
        </div>
    );
}