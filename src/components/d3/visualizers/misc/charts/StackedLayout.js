import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import * as d3 from 'd3';

export default () => {
    const width = 500;
    const height = 280;

    const margin = {
        top: 20, right: 100, bottom: 30, left: 50
    };

    const legendWidth = 200;

    useEffect(() => {
        const svg = d3.select('#stack-chartarea')
            .append('svg')
            .attr('width', width + margin.left + margin.right + legendWidth )
            .attr('height', height + margin.left + margin.right)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const x = d3.scaleTime()
            .range([0, width]);

        const y = d3.scaleLinear()
            .range([height, 0]);

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const xAxis = d3.axisBottom()
            .scale(x);

        const yAxis = d3.axisLeft()
            .scale(y)
            .tickFormat((x) => d3.format(x/1e9));

        const area = d3.area()
            .x(d => {
                return x(d.data.date)
            })
            .y0(d => {
                return y(d[0]);
            })
            .y1(d => {
                return y(d[1]);
            });

        const stack = d3.stack();

        const legend = svg.append('g')
            .attr('transform', `translate(${width + 10}, ${0})`)

        d3.csv('data/stacked_area2.csv').then(data => {
            console.log(data)
            
            color.domain(d3.keys(data[0]).filter(key => key!=='date'));
            
            const keys = data.columns.filter(d => d!=='date');
            console.log(keys);

            data.forEach(d => {
                d.date = d3.timeParse('%Y')(d.date);
            });

            const maxValue = d3.max(data, d => {
                const vals = d3.keys(d).map(key => key!=='date'? d[key]: 0);
                return d3.sum(vals);
            });

            x.domain(d3.extent(data, d => d.date));
            y.domain([0, maxValue]);

            stack.keys(keys);
            stack.order(d3.stackOrderNone);
            stack.offset(d3.stackOffsetNone);
            console.log(stack(data));

            const chart = svg.selectAll('.chart')
                .data(stack(data))
                .enter()
                .append('g')
                .attr('class', (d) => `chart ${d.key}`)
                .attr('fill-opacity', 0.5);

            chart.append('path')
                .attr('class', 'area')
                .attr('d', (d) => {
                    return area(d);
                })
                .style('fill', d => color(d.key));

            keys.forEach((key, i) => {
                legend.append('rect')
                    .attr('x', 0)
                    .attr('y', i*20)
                    .attr('width', 20)
                    .attr('height', 10)
                    .attr('fill', color(key));

                legend.append('text')
                    .attr('x', 30)
                    .attr('y', i*20 + 8)
                    .attr('font-size', '0.6rem')
                    .attr('font-weight', '400')
                    .text(key);
            });
            /*chart.append('text')
                .datum(function(d) { return d; })
                .attr('transform', function(d) { 
                    return 'translate(' + x(data[13].date) + ',' + y(d[13][1]) + ')'; 
                })
                .attr('x', -6) 
                .attr('dy', '.35em')
                .style("text-anchor", "start")
                .attr('font-size', '0.6rem')
                .text(function(d) { return d.key; })
                    .attr('fill-opacity', 1);*/

            svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', `translate(0, ${height})`)
                .call(xAxis);

            svg.append('g')
                .attr('class', 'y axis')
                .call(yAxis);

            svg.append ("text")
                .attr("x", 0-margin.left)
                .attr("y", -10)
                .attr('font-size', '0.8rem')
                .text("Billions of liters")

        });
        
    }, []);

    return (
        <div className='chart-container'>
            <span>Stacked Layout Graph</span>
            <div id='stack-chartarea'></div>
        </div>
    )
}