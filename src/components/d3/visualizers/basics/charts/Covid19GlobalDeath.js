import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import * as d3 from 'd3';
import d3Tip from "d3-tip";
import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import PauseCircleOutlineOutlinedIcon from '@material-ui/icons/PauseCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import FastForwardOutlinedIcon from '@material-ui/icons/FastForwardOutlined';
import FastRewindOutlinedIcon from '@material-ui/icons/FastRewindOutlined';

export default () => {
    const t = d3.transition().duration(750);

    const [ play, setPlay ] = useState(false);
    const [ data, setData ] = useState({});
    const [ colorScheme, setColorScheme ] = useState({});
    const [ maxDeath, setMaxDeath ] = useState({});

    let timeIndex = useRef(1);
    let interval = useRef();
    let periodicUpdate = useRef();

    const generateCovidDeathChart = () => {
        const margin = {top:40, right:20, bottom:80, left:150};
        const legendWidth = 200;
        const width = 640 - margin.left  - margin.right;
        const height = 720 - margin.top  - margin.bottom;
        
        const tip = d3Tip().attr('class', 'd3-tip')
            .html((d) => {
                let text = '<div class="tip"><span>Death Count:</span><span>';
                text+=d.total+'</span></div>';
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

        const dateGroup = group.append('g')
            .attr('transform', `translate(${width + 10}, ${0})`);

        d3.csv('/data/total-deaths-covid-19.csv').then(data => {
            const {dataByDate,top20Country, maxDeath} = formatData(data);
            const continentColor = d3.scaleOrdinal(d3.schemePastel1);
            const colorScheme = colorSchemes(top20Country);

            setData(dataByDate);
            setColorScheme(colorScheme);
            setMaxDeath(maxDeath);

            const legendGroup = group.append('g')
                .attr('transform', `translate(${width + 10}, ${height-(top20Country.length * 20)})`);
            
            top20Country.forEach((country, index) => {
                const legends = legendGroup.append('g')
                    .attr('transform', `translate(0, ${index*20})`);
                
                legends.append('rect')
                    .attr('width', 10)
                    .attr('height', 10)
                    .attr('fill', colorScheme[country]);
                legends.append('text')
                    .attr('x', 15)
                    .attr('y', 10)
                    .attr('font-size', '0.6rem')
                    .attr('font-weight', '400')
                    .text(country);
            });
            
            const dates = Object.keys(dataByDate);
            periodicUpdate.current(dataByDate, dates, maxDeath, colorScheme);

            update(dataByDate[dates[0]], dates[0], maxDeath, colorScheme);
        });

        periodicUpdate.current = (dataByDate, dates, maxDeath, colorScheme) => {
            interval.current = setInterval(() => {
                if(timeIndex.current < dates.length) {
                    let chartData = dataByDate[dates[timeIndex.current]];
                    chartData = _.reverse(_.sortBy(chartData, function(o) { return o.total; }));
                    update(chartData, dates[timeIndex.current], maxDeath, colorScheme);
                    timeIndex.current += 1;
                }
            }, 1000);
        }

        const update = (data, date, maxDeath, colorScheme) => {
            x.domain(data.map(o => o.country));
            y.domain([0, maxDeath]);
            const xAxis = d3.axisLeft(x);
            xAxisGroup.call(xAxis);

            const yAxis = d3.axisBottom(y)
                .tickFormat((d) => `#${d}`);    
            yAxisGroup.call(yAxis);

            const dates = dateGroup.selectAll('text')
                .data([date]);
            dates.exit().remove();
            dates.enter()
                .append('text')
                .attr('x', 0)
                .attr('y', 0)
                .attr('font-size', '1.2rem')
                .attr('font-weight', '400')
                .style('fill', '#6f7872')
                .merge(dates)
                .text(date);

            const rects = dataGroup.selectAll('rect')
                .data(data);

            //Remove old data.
            rects.exit().remove();

            //To update old element present in new data.
            rects.attr('x', (d) => {
                    return 1;
                })
                .attr('y', (d) => {
                    return x(d.country)-10;
                })
                .attr('height', d => {
                    return x.bandwidth()||20;
                })
                .attr('width', d => {
                    return y(d.total)+1;
                })
                .attr('fill', (d) => {
                    return colorScheme[d.country];
                });

            //Enter new elements of new data.
            rects.enter()
                .append('rect')
                .attr('x', 1)
                .attr('y', (d) => {
                    return x(d.country)-10;
                })
                .attr('height', d => {
                    return 20;
                })
                .attr('width', 0)
                .on("mouseover", tip.show)
                .on("mouseout", tip.hide)
                .transition(t)
                    .attr('width', d => {
                        return y(d.total)+1;
                    })
                    .attr('fill', (d) => {
                        return colorScheme[d.country];
                    });
            
            const labels = dataGroup.selectAll('text')
                    .data(data);
            labels.exit().remove();
            labels.enter()
                .append('text')
                .attr('font-size', '0.6rem')
                .attr('font-weight', '400')
                .style('fill', '#6f7872')
                .merge(labels)
                .attr('x', d => {
                    return y(d.total)+5;
                })
                .attr('y', (d) => {
                    return x(d.country);
                })
                .text((d) => {
                    return d.total;
                });
        }
    }

    const colorSchemes = (countries) => {
        let returnObj = {};
        const colors = ['#4d4dff', '#ff4d4d', '#ffa64d', '#88ff4d', '#ffa31a',
        '#ffff4d', '#c65353', '#999966', '#66ffff', '#993333',
        '#cc0099', '#cc00ff', '#ff3300', '#33cccc', '#993399',
        '#3366cc', '#669999', '#cc99ff', '#660033', '#ffcc66'];
        let colorIndex = 0;
        for (let i=0; i<countries.length; i++ ) {
            if(colorIndex === colors.length) {
                colorIndex = 0;
            }
            returnObj[countries[i]] = colors[i];
            colorIndex++;
        }
        return returnObj;
    }

    const formatData = (data) => {
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
        
        const maxDeath = d3.max(normalizedData, (d) => d.totalDeath);
        const top20Country = normalizedData.map(item => item.country);
        data = _.sortBy(data, obj => {
            return new Date(obj.Date);
        });
        const dataByDate = _.groupBy(data, 'Date');
        Object.keys(dataByDate).map(key => {
            const items = _.filter(dataByDate[key], (item) => {
                return top20Country.includes(item.Entity);
            }).map((item, index) => {
                return {
                    country: item.Entity,
                    death: item.Deaths,
                    total: item.Deaths
                }
            });
            dataByDate[key] = items;
        });
        let i = 0;
        let prevDate = null;
        for(let key of Object.keys(dataByDate)) {
            if(i > 0) {
                dataByDate[key].forEach(countryObj => {
                    let prevDateCountry = _.find(dataByDate[prevDate], {country: countryObj.country});
                    if(prevDateCountry) {
                        countryObj.total += prevDateCountry.total;
                    }
                }); 
            }
            i++;
            prevDate = key;
        }
        return {dataByDate, top20Country, maxDeath};
    }

    useEffect(() => {
        generateCovidDeathChart();
    }, []);

    const onPlay = () => {
        setPlay(false);
        const dates = Object.keys(data);
        periodicUpdate.current(data, dates, maxDeath, colorScheme);
    }

    const onPause = () => {
        setPlay(true);
        clearInterval(interval.current);
    }

    const onStop = () => {
        timeIndex.current = 0;
    }

    const onForward = () => {
        console.log(timeIndex.current);
        const total = Object.keys(data).length;
        if(timeIndex.current+10<(total-1)) {
            timeIndex.current = timeIndex.current+10;
        }
        else {
            timeIndex.current = total-1;
        }
    }

    const onBackWard = () => {
        const total = Object.keys(data).length;
        if(timeIndex.current-10 > 0) {
            timeIndex.current = timeIndex.current-10;
        }
        else {
            timeIndex.current = 0;
        }
    }

    return (
        <div className='chart-container'>
            <span> COVID-19 Death Count By Country(Top 20)</span>
            <div className='btn-bar'>
                <FastRewindOutlinedIcon className='icon' onClick={onBackWard}/>
                {play && <PlayCircleOutlineOutlinedIcon className='icon' onClick={onPlay} />}
                {!play && <PauseCircleOutlineOutlinedIcon className='icon' onClick={onPause} />}
                <CancelOutlinedIcon className='icon' onClick={onStop} />
                <FastForwardOutlinedIcon className='icon' onClick={onForward}/>
            </div>
            <div id='chartarea'></div>
        </div>
    );
}