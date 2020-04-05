import React from 'react';
import { withRouter } from 'react-router-dom';

import D3Component from '../components/d3/D3Component';

export default withRouter((props) => {

    return (
        <D3Component {...props} />
    );
});