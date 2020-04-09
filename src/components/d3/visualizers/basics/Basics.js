import React from 'react';

import Covid19GlobalDeath from './charts/Covid19GlobalDeath';
import Covid19CountryDeath from './charts/Covid19CountryDeath';

export default () => {
    
    return (
        <>
            <Covid19GlobalDeath />
            <Covid19CountryDeath />
        </>
    )
}