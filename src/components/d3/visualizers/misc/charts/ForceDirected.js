import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import * as d3 from 'd3';
import './ForceDirected.css';

export default () => {
    const width = 640;
    const height = 640;

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const simulation = d3.forceSimulation()
        .force('center', d3.forceCenter(width/2, height/2))
        .force('charge', d3.forceManyBody().strength(-40))
        .force('collide', d3.forceCollide(10).strength(0.9))
        .force('link', d3.forceLink().id(d => d.id));

    useEffect(() => {
        const svg = d3.select('#misc-chartarea')
            .append('svg')
            .attr('width', width)
            .attr('height', height);
        d3.json('data/force.json').then((graph) => {

            const link = svg.append('g')
                .attr('class', 'links')
                .selectAll('line')
                .data(graph.links)
                .enter()
                .append('line')
                .attr('stroke-width', (d) => Math.sqrt(d.value))
                .attr('stroke', '#000000')
                .attr('opacity', 0.6); 

            const nodes = svg.append('g')
                .attr('class', 'node')
                .selectAll('circle')
                .data(graph.nodes)
                .enter()
                .append('circle')
                .attr('r', 5)
                .attr('fill', d => {
                    return color(d.group);
                })
                .call(d3.drag()
                    .on('start', (d) => {
                        if(!d3.event.active) {
                            simulation.alphaTarget(0.7).restart();
                        }
                        d.fx = d.x;
                        d.fy = d.y;
                    })
                    .on('drag', (d) => {
                        d.fx = d3.event.x;
                        d.fy = d3.event.y;
                    })
                    .on('end', (d) => {
                        if(!d3.event.active) {
                            simulation.alphaTarget(0);
                        }
                        d.fx = null;
                        d.fy = null;
                    })
                );

            // Basic tooltips
            nodes.append('title')
                .text(d => d.id);

            // Attach nodes to the simulation, add listener on the "tick" event
            simulation
                .nodes(graph.nodes)
                .on('tick', () => {
                    link
                        .attr('x1', d => { return d.source.x})
                        .attr('y1', d => { return d.source.y})
                        .attr('x2', d => { return d.target.x})
                        .attr('y2', d => { return d.target.y});
                    nodes
                        .attr('cx', d => { return d.x; })
                        .attr('cy', d => { return d.y; });
                });

            // Associate the lines with the "link" force
            simulation.force('link')
                .links(graph.links)
        });
    }, []);

    return (
        <div className='chart-container'>
            <span>Force Directed Graph</span>
            <div id='misc-chartarea'></div>
        </div>
    )
}