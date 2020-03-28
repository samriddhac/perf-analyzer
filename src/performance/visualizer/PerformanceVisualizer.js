import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import './PerformanceVisualizer.css';
import * as resources from '../../resources/resources.json';
import LoadVisualizer from './metrics-visualizers/loading/LoadVisualizer';
import FrameRateVisualizer from './metrics-visualizers/framerate/FrameRateVisualizer';

export default () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const getMetricVisualizer = (index) => {
        switch (index) {
            case '1':
                return <LoadVisualizer />;
            case '2':
                return <FrameRateVisualizer />;
            default:
                return <LoadVisualizer />;
        }
    }

    return (
        <div className='perf-container'>
            <span>{resources.performance.header}</span>
            <div>
                <Nav tabs>
                    {tabpanels.map(item => {
                        return (
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === item.index })}
                                    onClick={() => { toggle(item.index); }}
                                >
                                    {item.label}
                                </NavLink>
                            </NavItem>
                        )
                    })}
                </Nav>
                <TabContent activeTab={activeTab}>
                    {tabpanels.map(item => {
                        return (
                            <TabPane tabId={item.index}>
                                {getMetricVisualizer(item.index)}
                            </TabPane>
                        )
                    })}
                </TabContent>
            </div>
        </div>
    );
}

const tabpanels = [
    {
        index: '1',
        label: 'Load Stats'
    },
    {
        index: '2',
        label: 'FrameRate Stats'
    }
];