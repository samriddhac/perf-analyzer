import React, { useEffect } from 'react';
import _ from 'lodash';
import * as d3 from 'd3';

export default () => {

    const generateCovidDeathChart = () => {
        const group = d3.select('#chartarea')
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
            .text('COVID-19 Death Count');
        
        //y label
        group.append('text')
            .attr("y", -60)
            .attr("x", -(height / 2))
            .attr('font-size', '0.8rem')
            .attr('color', 'blue')
            .attr('text-anchor', 'middle')
            .attr("transform", "rotate(-90)")
            .text('Country');

        d3.csv('/data/total-deaths-covid-19.csv').then(data => {
            data.forEach(item => item.Deaths = parseInt(item.Deaths));
            const groupedData = _.groupBy(data, 'Code');
            let normalizedData = Object.keys(groupedData).map(item => {
                let totalDeath = 0;
                let country = groupedData[item][0].Entity;
                for(let obj of groupedData[item]) {
                    totalDeath += obj.Deaths; 
                }
                return {
                    country,
                    totalDeath
                }
            }).filter(countryObj => countryObj.totalDeath > 0 
                &&  countryObj.country && countryObj.country !== ''
                && countryObj.country !== 'World'
                && countryObj.country !== 'Africa')
                .sort(function(a, b){return b.totalDeath - a.totalDeath})
                .slice(0, 50);

            // X Scale
            const x = d3.scaleBand()
                .domain(normalizedData.map(obj => obj.country))
                .range([0, height])
                .paddingOuter(1.0)
                .paddingInner(1.0);

            const y = d3.scaleLinear()
                .domain([0, d3.max(normalizedData, (d) => d.totalDeath)])
                .range([0, width]);

            const xAxis = d3.axisLeft(x);
            group.append('g')
                .attr('class', 'x axis')
                .call(xAxis);

            const yAxis = d3.axisTop(y)
                .tickFormat((d) => `#${d}`);
                
            group.append('g')
                .attr('class', 'y axis')
                .call(yAxis);

            const rects = group.selectAll('rect')
                .data(normalizedData);
            
            rects.enter()
                .append('rect')
                .attr('x', (d) => {
                    return 0;
                })
                .attr('y', (d) => {
                    return x(d.country)-10;
                })
                .attr('height', d => {
                    return x.bandwidth()||20;
                })
                .attr('width', d => {
                    return y(d.totalDeath);
                })
                .attr('fill', 'blue');
        });
    }

    useEffect(() => {
        generateCovidDeathChart();
    }, []);

    return (
        <div className='chart-container'>
            <span> COVID-19 Death Count By Country</span>
            <div id='chartarea'></div>
        </div>
    )
}

const margin = {
    top: 60,
    right: 20,
    bottom: 100,
    left: 80
};

const width = 640 - margin.left  - margin.right;
const height = 1880 - margin.top  - margin.bottom;