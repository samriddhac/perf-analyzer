import React, { useEffect } from 'react';
import _ from 'lodash';
import * as d3 from 'd3';
import d3Tip from "d3-tip"

export default () => {
    const t = d3.transition().duration(750);

    const generateCovidDeathChart = () => {
        const continentColor = d3.scaleOrdinal(d3.schemeCategory10);
        const margin = {top:60, right:20, bottom:100, left:150};
        const legendWidth = 200;
        const width = 640 - margin.left  - margin.right;
        const height = 720 - margin.top  - margin.bottom;

        const tip = d3Tip().attr('class', 'tool-tip')
            .html((d) => {
                let text = '<div class="tip"><span>Death Count:</span><span>';
                text+=d.totalDeath+'</span></div>';
                return text;
            });

        const group = d3.select('#chartarea')
            .append('svg')
                .attr('width', width + margin.left + margin.top + legendWidth)
                .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

        //x label
        group.append('text')
            .attr('y', height + (margin.bottom/2))
            .attr('x', width/2)
            .attr('font-size', '0.8rem')
            .attr('color', 'blue')
            .attr('text-anchor', 'middle')
            .text('COVID-19 Death Count');
        
        //y label
        //Rotation changing the direction of axis
        group.append('text')
            .attr("y", -(margin.left/2))
            .attr("x", -(height / 2))
            .attr('font-size', '0.8rem')
            .attr('color', 'blue')
            .attr('text-anchor', 'middle')
            .attr("transform", "rotate(-90)")
            .text('Country');

        const xAxisGroup = group.append('g')
            .attr('class', 'x axis');

        const yAxisGroup = group.append('g')
            .attr('class', 'y axis')
            .attr("transform", "translate(0," + height +")");

        // X Scale
        const x = d3.scaleBand()
            .range([0, height])
            .paddingOuter(1.0)
            .paddingInner(1.0);

        // Y Scale
        const y = d3.scaleLinear()
            .range([0, width]);

        const dataGroup = group.append('g');
        dataGroup.call(tip);

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
                .slice(0, 20);
            
            const legendGroup = group.append('g')
                .attr('transform', `translate(${width + 10}, ${height-400})`);

            normalizedData.forEach((obj, index) => {
                const legends = legendGroup.append('g')
                    .attr('transform', `translate(0, ${index*20})`);
                
                legends.append('rect')
                    .attr('width', 10)
                    .attr('height', 10)
                    .attr('fill', continentColor(obj.country));
                legends.append('text')
                    .attr('x', 15)
                    .attr('y', 10)
                    .attr('font-size', '0.6rem')
                    .attr('font-weight', '400')
                    .text(obj.country);
            });

            d3.interval(() => {
                update(normalizedData);
            }, 1000);
            update(normalizedData);
        });

        const update = (data) => {
            x.domain(data.map(obj => obj.country));
            y.domain([0, d3.max(data, (d) => d.totalDeath)]);

            const xAxis = d3.axisLeft(x);
            xAxisGroup.call(xAxis);

            const yAxis = d3.axisBottom(y)
                .tickFormat((d) => `#${d}`);    
            yAxisGroup.call(yAxis);

            const rects = dataGroup.selectAll('rect')
                .data(data);

            //Remove old data.
            rects.exit().remove();

            //To update old element present in new data.
            rects.attr('x', (d) => {
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
                });

            //Enter new elements of new data.
            rects.enter()
                .append('rect')
                .attr('x', 0)
                .attr('y', (d) => {
                    return x(d.country)-10;
                })
                .attr('height', d => {
                    return x.bandwidth()||20;
                })
                .attr('width', 0)
                .on("mouseover", tip.show)
                .on("mouseout", tip.hide)
                .transition(t)
                    .attr('width', d => {
                        return y(d.totalDeath);
                    })
                    .attr('fill', (d) => {
                        return continentColor(d.country);
                    });
        }
    }

    const generateItalyDeathRate = () => {
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
        generateCovidDeathChart();
        generateItalyDeathRate();
    }, []);

    return (
        <>
            <div className='chart-container'>
                <span> COVID-19 Death Count By Country(Top 20)</span>
                <div id='chartarea'></div>
            </div>
            <div className='chart-container'>
                <span> COVID-19 Death Count-Italy</span>
                <div id='scatter-chartarea'></div>
            </div>
        </>
    )
}

const margin = {
    top: 60,
    right: 20,
    bottom: 100,
    left: 80
};