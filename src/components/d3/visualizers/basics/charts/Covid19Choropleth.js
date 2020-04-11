import React, { useEffect } from 'react';
import _ from 'lodash';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import * as d3colorscheme from 'd3-scale-chromatic';

export default () => {

    const width = 720;
    const height = 480;
    const t = d3.transition().duration(750);
    const projection = d3.geoEqualEarth()
        .scale(140)
        .translate([width/2, height/2])
        .precision(0.1);
    const path = d3.geoPath().projection(projection);

    const graticule = d3.geoGraticule();

    useEffect(() => {
        const svg = d3.select('#choropleth-world-covid')
            .append('svg')
            .attr('width', width)
            .attr('height', height);
        
        const promises = [
            d3.json('data/countries-110m.json'),
            d3.csv('/data/total-deaths-covid-19.csv')
        ];

        Promise.all(promises).then((data) => {
            const world = data[0];
            const {chartDeathMap, chartColorMap} = formatData(data[1]);
            svg.append('g')
                .attr('class', 'land')
                .selectAll('path')
                .data(topojson.feature(world, world.objects.countries).features)
                .enter()
                .append('path')
                .attr('fill', d => {
                    let color = chartColorMap.get(d.properties.name.toLowerCase())
                        ?chartColorMap.get(d.properties.name.toLowerCase()):'#fca6a4';
                    return color;
                })
                .attr('d', path)
                .append('title')
                .text(d => {
                    let text = d.properties.name+' : ';
                    return text + (chartDeathMap.get(d.properties.name.toLowerCase())||0);
                });

            /*svg.append("path")
                .datum(topojson.feature(world, world.objects.land))
                .attr("class", "land")
                .attr("d", path);*/

            svg.append("path")
                .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
                .attr("class", "boundary")
                .attr("d", path);

            /*svg.append("path")
                .datum(graticule)
                .attr("class", "graticule")
                .attr("d", path);*/

        });

    }, []);

    const formatData = (data) => {
        const chartDeathMap = new Map();
        const chartColorMap = new Map();
        data.forEach(item => item.Deaths = parseInt(item.Deaths));
        const groupedData = _.groupBy(data, 'Code');
        let maxDeath = 0;
        Object.keys(groupedData).forEach(item => {
            let totalDeath = 0;
            let country = groupedData[item][0].Entity;
            for(let obj of groupedData[item]) {
                totalDeath += obj.Deaths; 
            }
            if(!['world', 'africa'].includes(country.toLowerCase())) {
                if(totalDeath > maxDeath) {
                    maxDeath = totalDeath;
                }
                chartDeathMap.set(country.toLowerCase(), totalDeath);
            }
        });
        const chartRange = getChartRange(maxDeath);
        let itr = chartDeathMap.keys();
        for(let i=0; i<chartDeathMap.size; i++) {
            let country = itr.next().value;
            if(chartDeathMap.get(country)) {
                for(let range of chartRange) {
                    if(chartDeathMap.get(country)>=range.min 
                        && chartDeathMap.get(country)<=range.max) {
                            chartColorMap.set(country, range.color);
                            break;
                    }
                }
            }
            else {
                chartColorMap.set(country, '#fca6a4');
            }
        }
        return {chartDeathMap, chartColorMap};
    }

    const getChartRange = (maxDeath) => {
        const chartRange = [
            {
                min:0,
                max:0,
                color: '#fca6a4'
            },
            {
                min:maxDeath,
                max:maxDeath,
                color: '#0f0100'
            }
        ];
        let range = maxDeath/4;
        let value = 1;
        for(let i=0; i<4; i++) {
            let color ='';
            switch(i) {
                case 0:
                    color = '#fa5246';
                break;
                case 1:
                    color = '#8c0f06';
                break;
                case 2:
                    color = '#630a04';
                break;
                case 3:
                    color = '#400501';
                break;
            }
            chartRange.push({
                min: value,
                max: (parseInt(value+range)>=maxDeath)?(maxDeath-1):parseInt(value+range),
                color
            });
            value = parseInt(value+range);
        }
        return chartRange;
    }

    return (
        <div className='chart-container'>
            <span> COVID-19 Death </span>
            <div id='choropleth-world-covid'></div>
        </div>
    )
}