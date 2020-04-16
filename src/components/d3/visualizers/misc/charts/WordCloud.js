import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import * as d3 from 'd3';
import * as d3cloud from 'd3-cloud';

export default () => {
    const width = 600;
    const height = 400;

    const margin = {
        top: 20, right: 100, bottom: 30, left: 50
    };

    useEffect(() => {
        const svg = d3.select('#cloud-chartarea')
            .append('svg')
            .attr('width', width + margin.left + margin.right )
            .attr('height', height + margin.left + margin.right)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        d3.csv('data/wordcloud.csv').then(data => {
            console.log(data)
            
            const nestedItems = d3.nest().key(d => {
                return d.State;
            }).map(data);
            console.log(nestedItems);
            
            const categories = d3.keys(nestedItems);
            console.log(categories);

            const fontSize = d3.scalePow().exponent(5).domain([0,1]).range([40, 80]);
            const draw = (words) => {
                const wordcloud = svg.append('g')
                    .attr('class', 'wordcloud')
                    .attr('transform', `translate(${width/2}, ${height/2})`);

                wordcloud.selectAll('text')
                    .data(words)
                    .enter()
                    .append('text')
                    .attr('class', 'word')
                    .style('fill', (d,i) => color(i))
                    .style('font-size', d => d.size+"px")
                    .style('font-family', d => d.font)
                    .attr('text-anchor', 'middle')
                    .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
                    .text(d=>d.text)
            }
            const  layout = d3cloud()
                .size([width, height])
                .timeInterval(20)
                .words(data)
                .rotate(() => ~~(Math.random() * 2) * 90)
                .fontSize(function(d,i) { return fontSize(Math.random()); })
                .fontWeight(["bold"])
                .text(function(d) { return d.Team_EN; })
                .on("end", draw)
                .start();
            
        });
        
    }, []);

    return (
        <div className='chart-container'>
            <span>Word Cloud Graph</span>
            <div id='cloud-chartarea'></div>
        </div>
    )
}