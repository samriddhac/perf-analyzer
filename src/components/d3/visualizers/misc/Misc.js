import React from 'react';
import ForceDirected from './charts/ForceDirected';
import StackedLayout from './charts/StackedLayout';
import WordCloud from './charts/WordCloud';

export default () => {
    
    return (
        <>
            <ForceDirected />
            <WordCloud/>
            <StackedLayout />
        </>
    )
}