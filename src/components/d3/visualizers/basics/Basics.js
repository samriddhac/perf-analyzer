import React from 'react';

import Covid19GlobalDeath from './charts/Covid19GlobalDeath';
import Covid19CountryDeath from './charts/Covid19CountryDeath';
import Covid19Choropleth from './charts/Covid19Choropleth';

export default () => {
    
    return (
        <>
            <Covid19Choropleth/>
            <Covid19GlobalDeath />
            <Covid19CountryDeath />
        </>
    )
}