import React, { useEffect } from 'react';
import _ from 'lodash';
import * as d3 from 'd3';

export default () => {
    const t = d3.transition().duration(750);

    const generateDeathRate = (country, color, divId) => {
        const margin = {
            top: 60,
            right: 20,
            bottom: 100,
            left: 80
        };
        const width = 640 - margin.left  - margin.right;
        const height = 480 - margin.top  - margin.bottom;
        const continentColor = d3.scaleBand(d3.schemePastel1);
        const group = d3.select(divId)
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
            .range([height, 0]);

        const area = d3.area()
            .x((d) => {
                return x(d.date)
            })
            .y0(d => {
                return y(0);
            })
            .y1(d => { 
                return y(d.death);
            });

        const line = d3.line()
            .x((d) => {
                return x(d.date)
            })
            .y(d => {
                return y(d.death);
            });

        d3.csv('/data/total-deaths-covid-19.csv').then(data => {
            data.forEach(item => item.Deaths = parseInt(item.Deaths));
            const groups = _.groupBy(data, 'Code');
            const normalizedData = groups[country].map(obj => {
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
            y.domain([d3.min(data, (d) => d.death), d3.max(data, (d) => d.death)]);

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
                    return color.circle;
                })
                .transition(t)
                    .attr('cx', (d) => {
                        return x(d.date)+1;
                    })
                    .attr('cy', (d) => {
                        return y(d.death)-1;
                    })
                    .attr('r', 1);

            
            group.append('path')
                .attr('fill', color.area)
                .attr('d', area(data));
            group.append('path')
                .attr('fill', color.line)
                .attr('opacity', 0.6)
                .attr('d', line(data));
        }
    }

    useEffect(() => {
        generateDeathRate("CHN", {line:"#f2dedc", area:"#F5A9A9", circle:"#4a0601"}, 
            '#scatter-chartarea-china');
        generateDeathRate("ITA", {line:"#22538a", area:"#a1c5ed", circle:"#22538a"}, 
            '#scatter-chartarea-italy');
        generateDeathRate("ESP", {line:"#e8cc84", area:"#c99b24", circle:"#e8cc84"}, 
            '#scatter-chartarea-spain');
        generateDeathRate("IRN", {line:"#378a22", area:"#98e884", circle:"#378a22"}, 
            '#scatter-chartarea-iran');
    }, []);

    return (
        <>  
            <div className='chart-container'>
                <span> COVID-19 Death Count-Italy</span>
                <div id='scatter-chartarea-italy'></div>
            </div>
            <div className='chart-container'>
                <span> COVID-19 Death Count-China</span>
                <div id='scatter-chartarea-china'></div>
            </div>
            <div className='chart-container'>
                <span> COVID-19 Death Count-Spain</span>
                <div id='scatter-chartarea-spain'></div>
            </div>
            <div className='chart-container'>
                <span> COVID-19 Death Count-Iran</span>
                <div id='scatter-chartarea-iran'></div>
            </div>
        </>
    );
}