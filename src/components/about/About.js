import React from 'react';

import './About.css';
import Header from '../common/header/Header';
import withPerformance from '../../performance/PerfHOC';
import SkillBlock from './SkillsBlock';
import Location from './Location';
import * as resources from '../../resources/resources';
import me from './me.jpg';
import linkedin from './linkedin.png';
import github from './github.png';

const About = (props) => {
    
    return (
        <div className='layout'>
            <Header {...props} />
            <div className='layout-1'>
                <div className='about-container'>
                    <h1>{resources.about_me}</h1>
                    <div className='about-body'>
                        <div className="img-container">
                            <div className="img-block">
                                <img src={me} className="thumbnail-md me" alt="" /> 
                            </div>
                        </div>
                        <div className='right-container'>
                            <div className="name">{resources.name}</div>
                            <div className="sub-titles">{resources.sub_title}</div>
                            <div className="icon-toolbar">
                                <a href={resources.linkedin_url}>
                                    <img src={linkedin} className="icon" alt="" />
                                </a> 
                                <a href={resources.github_url}>
                                    <img src={github} className="icon" alt="" /> 
                                </a>
                            </div>
                            <p className='para' 
                                dangerouslySetInnerHTML={{__html:resources.about_me_text}}>
                            </p>
                            <div className="skill-sets">
                                {
                                    resources.skills_exps.map( item => {
                                        return <SkillBlock name={Object.keys(item)[0]}/>
                                    })
                                }
                            </div>
                            <div className='exp-location'>
                                <div className='exp'>
                                    <label>{resources.exp}</label>
                                    <div className='skill-exps'>
                                    {
                                        resources.skills_exps.map( item => {
                                            return (
                                                <div className='exp-table'>
                                                    <SkillBlock name={Object.keys(item)[0]}/>
                                                    <span>{item[Object.keys(item)[0]]}</span>
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                                <div className='exp location'>
                                    <label>{resources.location}</label>
                                    <Location />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withPerformance(About);